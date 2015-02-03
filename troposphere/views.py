from datetime import datetime
import json
import logging
import os

from django.conf import settings
from django.core import serializers
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseForbidden
from django.shortcuts import render, redirect, render_to_response
from django.template import RequestContext

import requests

from caslib import OAuthClient as CAS_OAuthClient

from troposphere.models import MaintenanceRecord
from troposphere.version import get_version

logger = logging.getLogger(__name__)
#key = open(settings.OAUTH_PRIVATE_KEY_PATH, 'r').read()
cas_oauth_client = CAS_OAuthClient(settings.CAS_SERVER,
                                   settings.OAUTH_CLIENT_CALLBACK,
                                   settings.OAUTH_CLIENT_KEY,
                                   settings.OAUTH_CLIENT_SECRET,
                                   auth_prefix=settings.CAS_AUTH_PREFIX)


def root(request):
    return redirect('application')


def application(request):
    response = HttpResponse()
    _, disabled_login = get_maintenance(request)

    if disabled_login:
        return redirect('maintenance')

    template_params = {
        'access_token': request.session.get('access_token'),
        'emulator_token': request.session.get('emulator_token'),
        'emulated_by': request.session.get('emulated_by'),
        'disable_login': disabled_login
    }

    if hasattr(settings, "INTERCOM_APP_ID"):
        template_params['intercom_app_id'] = settings.INTERCOM_APP_ID
        template_params['intercom_company_id'] = settings.INTERCOM_COMPANY_ID
        template_params['intercom_company_name'] = settings.INTERCOM_COMPANY_NAME

    # If beta flag in query params, set the session value to that
    if "beta" in request.GET:
        request.session['beta'] = request.GET['beta'].lower()

    # If beta flag not defined, default it to false to show the old UI
    if "beta" not in request.session:
        request.session['beta'] = 'false'

    # Return the new Troposphere UI
    # If user logged in, show the full app, otherwise show the public site
    if request.session['beta'] == 'true':
        if template_params['access_token']:
            response = render_to_response(
                'application.html',
                template_params,
                context_instance = RequestContext(request))
        else:
            response = render_to_response(
                'index.html',
                context_instance = RequestContext(request))

    # Return the old Airport UI
    # If user logged in, show the app, otherwise show the login page
    else:
        if template_params['access_token']:
            response = render_to_response(
                'cf2.html',
                template_params,
                context_instance = RequestContext(request))
        else:
            response = render_to_response(
                'login.html',
                template_params,
                context_instance = RequestContext(request))


    response.set_cookie('beta', request.session['beta'])
    return response


def application_backdoor(request):
    response = HttpResponse()
    disabled_login = False

    template_params = {
        'access_token': request.session.get('access_token'),
        'emulator_token': request.session.get('emulator_token'),
        'emulated_by': request.session.get('emulated_by'),
        'disable_login': disabled_login
    }

    if hasattr(settings, "INTERCOM_APP_ID"):
        template_params['intercom_app_id'] = settings.INTERCOM_APP_ID
        template_params['intercom_company_id'] = settings.INTERCOM_COMPANY_ID
        template_params['intercom_company_name'] = settings.INTERCOM_COMPANY_NAME

    # If beta flag in query params, set the session value to that
    if "beta" in request.GET:
        request.session['beta'] = request.GET['beta'].lower()

    # If beta flag not defined, default it to false to show the old UI
    if "beta" not in request.session:
        request.session['beta'] = 'false'

    # Return the new Troposphere UI
    # If user logged in, show the full app, otherwise show the public site
    if request.session['beta'] == 'true':
        if template_params['access_token']:
            response = render_to_response(
                'application.html',
                template_params,
                context_instance = RequestContext(request))
        else:
            response = render_to_response(
                'index.html',
                context_instance = RequestContext(request))

    # Return the old Airport UI
    # If user logged in, show the app, otherwise show the login page
    else:
        if template_params['access_token']:
            response = render_to_response(
                'cf2.html',
                template_params,
                context_instance = RequestContext(request))
        else:
            response = render_to_response(
                'login.html',
                template_params,
                context_instance = RequestContext(request))


    response.set_cookie('beta', request.session['beta'])
    return response


def get_maintenance(request):
    """
    Returns a list of maintenance records along with a boolean to indicate
    whether or not login should be disabled
    """
    records = MaintenanceRecord.active()
    disable_login = MaintenanceRecord.disable_login_access(request)
    return (records, disable_login)


def maintenance(request):
    records, disabled = get_maintenance(request)

    if not disabled:
        return redirect("/login")

    return render(request, 'login.html', {"records": records, "disable_login": disabled})


def login(request):
    #TODO: Collect request.GET['redirect'] and store in SESSION
    redirect_url = request.GET.get('redirect')
    if redirect_url:
        request.session['redirect_to'] = redirect_url
    return redirect(cas_oauth_client.authorize_url())


def logout(request):
    request.session.flush()
    #Look for 'cas' to be passed on logout.
    request_data = request.GET
    if request_data.get('cas', False):
        redirect_to = request_data.get("service")
        if not redirect_to:
            redirect_to = settings.SERVER_URL + reverse('application')
        logout_url = cas_oauth_client.logout(redirect_to)
        logger.info("Redirect user to: %s" % logout_url)
        return redirect(logout_url)
    return redirect('application')


def cas_oauth_service(request):
    logger.debug("OAuth-CAS service request")
    if 'code' not in request.GET:
        #You should not be here, you should be at OAuth-wrapped CAS login.
        return redirect(cas_oauth_client.authorize_url())

    code_service_ticket = request.GET['code']
    token, expiry_date = cas_oauth_client.get_access_token(code_service_ticket)
    if not token:
        #code_service_ticket has expired (They don't last very long...)
        #Lets try again (Redirect to OAuth-wrapped CAS login)
        return redirect(cas_oauth_client.authorize_url())
    #Token is valid... Our work here is done.
    request.session['access_token'] = token

    #TODO: Looking for 'redirect' in SESSION, send them there...
    if request.session.get('redirect_to'):
        redirect_url = request.session.pop('redirect_to')
        return redirect(redirect_url)
    return redirect('application')


def unemulate(request):
    if 'emulator_token' in request.session:
        old_token = request.session['emulator_token']
        del request.session['emulator_token']
    else:
        old_token = request.session['access_token']

    # Restore the 'old token'
    logger.info("[EMULATE]Session_token: %s. Request to remove emulation."
                % (old_token, ))
    request.session['access_token'] = old_token

    if "emulate_by" in request.session:
        del request.session['emulate_by']

    return redirect('application')


def emulate(request, username):
    if 'access_token' not in request.session:
        return redirect(cas_oauth_client.authorize_url())

    if 'emulator_token' in request.session:
        old_token = request.session['emulator_token']
    else:
        old_token = request.session['access_token']

    logger.info("[EMULATE]Session_token: %s. Request to emulate %s."
                % (old_token, username))

    r = requests.get(
        os.path.join(settings.SERVER_URL,
                     "api/v1/token_emulate/%s" % username),
        headers={'Authorization': 'Token %s' % old_token})
    try:
        j_data = r.json()
    except ValueError:
        logger.warn("[EMULATE]The API server returned non-json data(Error) %s" % r.text)
        return redirect('application')
    if type(j_data) == dict:
        new_token = j_data.get('token','')
        emulated_by = j_data.get('emulated_by','')
    if not new_token or not emulated_by:
        logger.warn("[EMULATE]The API server returned data missing the key(s) "
                    "token/emulated_by. Data: %s" % j_data)
        return redirect('application')

    logger.info("[EMULATE]User %s (Token: %s) has emulated User %s (Token:%s)"
                % (emulated_by, old_token, username, new_token))

    request.session["emulate_by"] = emulated_by
    request.session['emulator_token'] = old_token
    request.session['access_token'] = new_token
    return redirect('application')


def forbidden(request):
    """
    View used when someone tries to log in and is an authenticated iPlant
    user, but was found to be unauthorized to use Atmosphere by OAuth.
    Returns HTTP status code 403 Forbidden
    """
    return render(request, 'no_user.html', status=403)


def version(request):
    v = get_version()
    v["commit_date"] = v["commit_date"].isoformat()
    v_json = json.dumps(v)
    return HttpResponse(v_json, mimetype='application/json')


def tests(request):

    template_params = {
        'test': request.GET['test'].lower()
    }

    return render(request, 'tests.html', template_params)

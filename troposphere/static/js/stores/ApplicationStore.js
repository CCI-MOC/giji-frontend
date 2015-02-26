define(
  [
    'underscore',
    'collections/ApplicationCollection',
    'collections/ApplicationSearchResultCollection',
    'dispatchers/Dispatcher',
    'models/Application',
    'actions/ApplicationActions',
    'stores/Store',
    'constants/ApplicationConstants',
    'controllers/NotificationController',
    'context'
  ],
  function (_, ApplicationCollection, ApplicationSearchResultCollection, Dispatcher, Application, ApplicationActions, Store, ApplicationConstants, NotificationController, context) {

    var _applications = null;
    var _searchResults = {};
    var _isFetching = false;
    var _isFetchingMore = false;
    var _isSearching = false;

    var fetchApplications = function () {
      if(!_isFetching) {
        _isFetching = true;
        var applications = new ApplicationCollection();
        applications.fetch().done(function () {
          _isFetching = false;
          _applications = applications;
          ApplicationStore.emitChange();
        });
      }
    };

    var fetchMoreApplications = function () {
      var nextUrl = _applications.meta.next;
      if(nextUrl && !_isFetchingMore){
        _isFetchingMore = true;
        var moreApplications = new ApplicationCollection();
        moreApplications.fetch({url: nextUrl}).done(function () {
          _isFetchingMore = false;
          _applications.add(moreApplications.models);
          _applications.meta = moreApplications.meta;
          ApplicationStore.emitChange();
        });
      }
    };

    function update(application){
      application.save({
        name: application.get('name'),
        description: application.get('description'),
        tags: application.get('tags')
      }, {
        patch: true
      }).done(function(){
        ApplicationStore.emitChange();
      }).fail(function(){
        var failureMessage = "Error updating Application " + application.get('name') + ".";
        NotificationController.error(failureMessage);
        ApplicationStore.emitChange();
      });
    }

    function searchFor(query) {
      if (!_isSearching) {
        _isSearching = true;
        var searchResults = new ApplicationSearchResultCollection(null, {
          query: query
        });

        searchResults.fetch({
          success: function () {
            _isSearching = false;
            _searchResults[query] = searchResults;
            ApplicationStore.emitChange();
          },
          error: function (coll, response) {
            NotificationController.error(response.responseText);
          }
        });
      }
    }

    var ApplicationStore = {

      get: function (appId) {
        if(!_applications) {
          fetchApplications();
        } else {
          return _applications.get(appId);
        }
      },

      getAll: function () {
        if(!_applications) {
          fetchApplications();
        } else {
          return _applications;
        }
      },

      fetchMore: function(){
        fetchMoreApplications();
      },

      getFeatured: function () {
        if(!_applications) {
          fetchApplications();
        } else {
          var featuredApplications = _applications.filter(function (app) {
            return app.get('featured');
          });
          return new ApplicationCollection(featuredApplications);
        }
      },

      getFavorited: function(){
        if (!_applications) {
          fetchApplications();
        } else {
          return new ApplicationCollection(_applications.where({isFavorited: true}));
        }
      },

      getCreated: function(){
        if (!_applications) {
          fetchApplications();
        } else {
          return new ApplicationCollection(_applications.where({created_by: context.profile.get('username')}));
        }
      },

      getSearchResultsFor: function(query){
        var searchResults = _searchResults[query];
        if(!searchResults){
          searchFor(query);
        }
        return searchResults;
      },

      getResults: function (query) {
        return _searchResults[query];
      },

      toggleFavorited: function(application){
        var isFavorited = application.get('isFavorited');
        var prefix = isFavorited ? " un-" : " ";
        application.set('isFavorited', !isFavorited);

        application.favorited(!isFavorited).done(function(){
          var successMessage = "Image " + application.get('name') + prefix + "favorited.";
          //NotificationController.success(successMessage);
          ApplicationStore.emitChange();
        }).fail(function () {
          var failureMessage = "Image " + application.get('name') + " could not be" + prefix + "favorited.";
          NotificationController.error(failureMessage);
          var wasFavorited = application.previousAttributes().isFavorited;
          application.set('isFavorited', wasFavorited);
          ApplicationStore.emitChange();
        });
      },

      getApplicationWithMachine: function(machineId){
        var application = _applications.filter(function(application){
          var machines = application.get('machines');
          return machines.where({alias: machineId}).length > 0;
        });
        return application[0];
      }

    };

    Dispatcher.register(function (payload) {
      var action = payload.action;

      switch (action.actionType) {
        case ApplicationConstants.APPLICATION_UPDATE:
          update(action.application);
          break;

        case ApplicationConstants.APPLICATION_TOGGLE_FAVORITED:
          ApplicationStore.toggleFavorited(action.application);
          break;

        default:
          return true;
      }

      ApplicationStore.emitChange();

      return true;
    });

    _.extend(ApplicationStore, Store);

    return ApplicationStore;
  });

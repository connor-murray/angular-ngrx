
# Angular Ngrx

## Start Development Server

Start the mock node REST API with the following command:

    npm run server

## To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)

## Dev Tools
Install redux dev tools from chrome store

## Store 
centralized application state singleton service that acts as in memory database
store is immutable
cannot modify sate from components etc but must dispatch an action that creates a new version of the app state via reducer

## Reducer
takes current state & action produces a new state based off action
  
## Selectors
 selectors are memorized functions - if called with same input args they do not calculate output again they just return result from memory without executing selector again
return requested data from state

## Effects
can produce effects in response to actions i.e. save to session storage - this is exactly what ngrx effects is for

## Actions
Tell the reducer what part of the state needs updated and trigger the update passing the required args

## Libraries

- NGRX Schematics
Auto generate required files such as actions, reducers, side effects and state object

- NGRX Store Freeze
so when state passed to app it cannot be mutated - cant re-assign values inside reducers as it is immutable
reducer needs to be a pure function - takes in state & action - outputs new state beased off of input - does not mutate input state & return
NGRX store freeze tool for dev mode : after action dispatched and processed it freezes the store making it immutable

- @ngrx/router-store
debug tools bottom has a time traveller play button
hit play button runs through the state change cycle that the app went through up until this point
although it show state change it is not integrated with the apps router so the ui does not reflect these changes
@ngrx/router-store allows the route changes to be reflected on ui also during playback

- @ngrx/entity
recommended way to store collections of data in a normalized manner providing a number of inbuilt selectors to avoid duplicate code
There are two primary reasons we maintain a list of ids and a dictionary of entities:
 We want to make looking up a specific entity really fast. If you wanted to just select one book from the store, using the entities dictionary is much faster than searching through an array
We also want to maintain the order of the list. This is especially important if you want to keep the list sorted!
The shape of EntityState<V> meets both goals. It’s also extendable, so we can include other pertinent information in the collection of Books, such as the currently selected book or if they are loading


An Entity represents some sort of business data, so Course and Lesson are examples of entity types.
if you wanted to store a collection of objects in store one way to do it would be an array.
this has several problems.
if we want to look up a course based on it's known id, we would have to loop through the whole collection, which could be inefficient for very large collections
more than that, by using an array we could accidentally store different versions of the same course (with the same id) in the array
if we store all our entities as arrays, our reducers will look almost the same for every entity
For example, take the simple case of adding a new entity to the collection. We would be reimplementing several times the exact same logic for adding a new entity to the collection and reordering the array in order to obtain a certain custom sort order

One of the roles of the store is to act as an in-memory client-side database that contains a slice of the whole database, from which we derive our view models on the client side via selectors.
This works as opposed to the more traditional design that consists in bringing the view model from the server via API calls. Because the store is an in-memory database, it would make sense to store the business entities in their own in-memory database "table", and give them a unique identifier similar to a primary key.
The data can then be flattened out, and linked together using the entity unique identifiers, just like in a database.
But there is only one problem: we have lost the information about the order of the collection!
This is because the properties of a Javascript object have no order associated to them, unlike arrays. Is there are any to still store our data by id in a map, and still preserve the information about the order?
Yes there is, we just have to use both a Map and an Array! We store the objects in a map (called entities), and we store the order information in an array (called ids):
This state format, which combines a map of entities with an array of ids is known as the Entity State format
This is the ideal format for storing business entities in a centralized store, but maintaining this state would represent an extra burden while writing our reducers and selectors, if we would have to write them manually from scratch.
Take for example a reducer for a LoadCourse action, that takes the current CoursesState and adds a new course to it and reorders the collection based on the seqNo field.

## On Change Detection
Use on push change detection in container/smart components.
Use of immutability with store architecture means component cannot change state.
Use of observables and async pipe in html mean change detection is faster and not continually monitoring everything.

## Improvements
- facade pattern to wrap NGRX

## when to use the store
Stores and applications with concurrent updates
So this means that Redux helps us cope with situations where we are passing inputs to components up the component tree using @Input(), but those inputs feel extraneous, as not part of the application at that point.
For example, we are passing something 5 or 10 levels up the component tree. The leaves of the tree know what to do with it, but for all the components in the middle the input feels extraneous and makes that component less reusable and more tied to the application. But that is just one example.
pass data deep down the tree, and react to events several levels up the component tree
Another issue is, we have sibling components in the tree that are interdependent, and that represent different view for the same data on the screen, like a list of folders with unread messages, and a total unread messages counter on the page header.

## Normalization
As APIs usually send back data in nested form that data needs to be transformed into a normalized shape before it can be included in the state tree.
The `Normalizr` library is the recommended way to achieve this.

# Command Line TODO List I

Let's build a command line TODO list application. You can organize the files however you want.

The TODO list itself is contained in `todos.txt`. The `todo.js` file is mean to be run directly.

## Contents <!-- omit in toc -->

- [Learning Goals](#learning-goals)
- [Iterations](#iterations)

## Learning Goals

This application has all the moving parts of an typical application: user input, display code, and data persistence.  It's important to think about what *responsibilities* this application has to fulfill.

Keep things like the [single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle) and [separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns) in mind as you decide what objects and classes belong in your application.

As you work through the iterations, pay close attention to how *change* impacts your application.  When a new feature is added how many files do you have to change?  How frustrating is it to make those changes?

## Iterations

We're not going to break this down into iterations for you, but rather describe the its requirements. It's up to you to decide what order to do the work in.

The TODO list is contained in `todos.txt`.

- [ ] A user can list the tasks on their TODO list. It should work like this:

  ```console
  $ node todo.js list
  1. Bake a delicious blueberry-glazed cheesecake
  2. Write up that memo and email it to my boss
  $
  ```

- [ ] A user can add (append) a task to their TODO list. It should work like this:

  ```console
  $ node todo.js add "Walk the dog"
  Appending "Walk the dog" to the TODO list
  $
  ```

- [ ] A user can delete a task from their TODO list. It should work like this:

  ```console
  $ node todo.js delete 1
  Deleted "Bake a delicious blueberry-glazed cheesecake" from the TODO list
  ```

We suggest doing the following requirement LAST since you'll have to change how you store information in `todos.txt` and how the information is displayed.

- [ ] A user can mark a task as completed

  ```console
  $ node todo.js list
  1. [ ] Walk the dog
  2. [ ] Buy some milk
  3. [ ] Make dinner
  $ node todo.js complete 2
  Marked "Buy some milk" as completed...
  $ node todo.js list
  1. [ ] Walk the dog
  2. [X] Buy some milk
  3. [ ] Make dinner
  $
  ```

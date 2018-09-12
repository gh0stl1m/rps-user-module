# User module
This module was been created to manage the user domain of the application.

## Desing
The module use the architechture called **Clean Architecture**, based on the boilerplate [clean-node](https://github.com/gh0stl1m/clean-node)

## Entities
The domain contain two entities:
- User: This entitie contains the basic user information for the player.
- Statistics: This entitie contains the results of the games of the player.

## UseCases
The use cases contains all the business rules for the two entities, for the case of this module we have two use cases:
- User: Contains all the business rules for the user, like a create and read user information.
- Statistics: Contain all the business rules for the user statistics, like notify the results of a game.

## Drivers
The drivers contains only the connection with the [MongDB Connection Module](https://github.com/gh0stl1m/rps-mongoconnection-module).

## Interfaces
The interface expose to another modules the methods which are going to be used for the services.

> **Note:** The module is part of the Game of Drones ecosystem, it it a technical test for the company UruIT.
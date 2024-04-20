# Event Rollercoaster

**Note: This project is intentionally simplified and designed for demonstration purposes only. It serves as a showcase of basic functionality and may not include advanced features or optimizations typically found in production-grade applications.**


Project  is built using Vue JS 3 with Composition API.

[Starting Project skeleton](https://github.com/simeon-petrov-5/softuni-vue-js-starter) thanks to [Simeon Petrov](https://github.com/simeon-petrov-5)
# Quick navigation

- [Pages overview](#overview)
- [Data fetching](#fetching-the-data)
- [State management](#state-management)
- [Styles](#styles)
- [Other](#other)


## Overview
- Login Page
    * You will be prompted to log in the first time you load the website. Login info will be found on the page

- Home Page 
    * A Carousel with a few of the Upcoming events. 

- Events Page
    * A list with all events
    * Can be viewed in List or Grid Mode
    * Pagination available

- Event Details Page
  * Displays detailed information about the event, including its name, description, duration, start time, ticket price, along with available tickets and hall capacity.
  * Provides organizational information such as the organizer's name, address, contact details and hall capacity.
  * Allows users to select the number of tickets they want to purchase and adds them to the cart.
  * Presents information about performers

   

- Cart page
    * You can see all of your selected tickets
    * Changing amount is available, you can also remove tickets by setting them to 0
    * Clicking the Buy Button sends you to the Orders Page

- Orders Page
    * Here are listed all orders that are currently not paid and are in the reserved window
    * Once they expire they will no longer be available
    * Pay tickets button simulates a transaction and you are sent to the Tickets page

- Tickets Page
    * On the tickets page all orders are listed with the tickets attached to them
    * Every ticket has it`s unique QR code, created along with other important info about the event

[back to start](#event-rollercoaster)

## Fetching the data

[Backend API](https://github.com/Mihail-Avramov/FinalProjectSoftUni/tree/main/ConcertManagementSystem/ConcertManagementSystem.WebApi)

[Axios](https://axios-http.com/)  1.6.3 is used for the API requests.

Endpoints for the pages are as follows:

    - Login Page -> api/Login Method POST - to recieve your access token
                 -> api/Login Method GET - for validating your token before every call

    - Home Page  -> api/Concert/Upcoming/{Optional_number_of_events}

    - Events Page -> api/Concert -> Method GET

    - Event Details Page -> api/Concert/${id} Method GET
                         -> api/Booking Method GET
    - Cart page -> api/Booking Method POST

    - Orders Page -> api/Booking Method GET
                  -> api/Booking/Payment Method POST

    - Tickets Page -> api/Booking/Payment Method GET


## State management

Used [Pinia](https://pinia.vuejs.org/) 2.1.7 for user and cart state management. 


## Styles
- [PrimeVue](https://primevue.org/): 3.49.1

PrimeVue features a modern and responsive design powered by the PrimeVue framework. With a rich set of components, it provides a visually appealing and user-friendly experience.

- PrimeIcons: 6.0.1

- Scoped custom CSS.


[back to start](#event-rollercoaster)

## Other
 - QRCode: 1.5.3
 - [Vue Router](https://router.vuejs.org/): 4.2.5
 - ESLint: configurated for formatting

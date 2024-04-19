# Event Rollercoaster

Demo for Event Promotion Website with simplistic design power by PrimeVue
Project  is built using Vue JS 3 with Composition API.


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
    * Detailed info about the event and the performers involved
    * Tickets can be 
    * ----- TODO: More info ------

- Cart page
    * You can see your all selected tickets
    * Changing amount is available, you can also remove tickets if set them to 0
    * Clicking the Buy Button sends you to the Orders Page

- Orders Page
    * Here are listed all orders that are currently not payed and are in the reserved window
    * Once they expire they will no longer be available after page change or the backend will return error when you try to pay them
    * Pay tickets button simulates a transaction and you are sent to the Tickets page

- Tickets Page
    * On the tickets page all orders are listed with the tickets attached to them
    * Every ticket has it`s unique QR code created along with other important info about the event

[back to start](#event-rollercoaster)

## Fetching the data

Axios  1.6.3 is used for the API requests.

Endpoint for the pages are as follows:

    - Login Page -> api/Login Method POST - to recieve your access token
                 -> api/Login Method GET - for validating your token before every call

    - Home Page  -> api/Concert/Upcoming/{Optional number of events desired to visualise} Concert/${id} Method GET

    - Events Page -> api/Concert -> Method GET

    - Event Details Page -> api/Concert/${id} Method GET
                         -> api/Booking Method GET
    - Cart page -> api/Booking Method POST

    - Orders Page -> api/Booking Method GET
                  -> api/Booking/Payment Method POST

    - Tickets Page -> api/Booking/Payment Method GET


## State management

Used Pinia 2.1.7 for user and cart state management.


## Styles
- PrimeVue: ^3.49.1  homepage: https://primevue.org/

PrimeVue features a modern and responsive design powered by the PrimeVue framework. With a rich set of components, it provides a visually appealing and user-friendly experience.

- PrimeIcons: ^6.0.1

- Scoped custom css.


[back to start](#event-rollercoaster)

## Other
 - QRCode: ^1.5.3
 - Vue Router: ^4.2.5

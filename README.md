# Drupal10React

To set up the "Drupal10React" project locally with XAMPP, follow these steps:

1. Install XAMPP on your local machine.

2. Clone the "Drupal10React" repository into the `htdocs` directory of your XAMPP installation. For example:
   
   git clone <repository_url> C:\xampp\htdocs\Drupal10React
   
3. Start Apache and MySQL services using the XAMPP Control Panel.


4. Access the XAMPP dashboard in your web browser by navigating to `http://localhost/phpmyadmin/`.


5. Create a new database in phpMyAdmin and import the provided database file that is attached with the repository.


6. After importing the database, access `http://localhost/Drupal10React/web` in your web browser to install Drupal locally. Follow the Drupal installation instructions.


7. Once Drupal is installed, navigate to `xampp\htdocs\Drupal10React\react_app` in your terminal.


8. Install the necessary dependencies for the React app by running:

   npm install

9. After installing the dependencies, start the React application by running:

   npm start

10. To avoid fetch API errors, add the "moesif-origin-cors-change" extension to your Chrome browser.

Following these steps will set up the "Drupal10React" project locally with XAMPP, allowing you to run both the Drupal backend and the React frontend.

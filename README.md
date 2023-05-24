# ceng-407-408-2022-2023-Smart-Trip-Application
Smart Trip Application

## Getting Started
### Technology
* Ionic Framework – A framework for building native apps using Ionic Angular
* Node.js – for the frontend
* Java 11 – for the backend
* Micronaut - for the java

### Project Stucture
* File -> Project Structure -> Modules -> + -> Import Module -> Select backend folder -> Import module from external model -> Select Gradle -> Finish
* File -> Project Structure -> Modules -> + -> Import Module -> Select frontend folder -> Create module from existing sources -> Next -> Next -> Finish
* File -> Project Structure -> Project -> Select Project SDK as Java 11
* File -> Project Structure -> SDKs -> Select 11


### Build Setup
$ npm install -g @ionic/cli #to install ionic

### Use this if you cannot start the application using IDE
$ ionic serve  #reload at localhost:4200

### If necessary, do not forget to update these dependencies below
$ npm i ngx-star-rating –force
$ npm install --save @ionic-native/geolocation –force
$ ./gradlew shadowJar

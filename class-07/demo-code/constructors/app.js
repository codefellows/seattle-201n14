'use strict';

var sara = {
  course: '201d48',
  enrolled: true,
  instructors: ['Sam', 'Lena'],
  first: 'Sara',
  lastName: 'Haynes',
  preferredName: 'Sara without an H',
  homeTown: 'Seattle',
  introduction: function () {
    return 'Hi, my name is ' + this.firstName + ' ' + this.lastName + ', but you can call me ' + this.preferredName + '. I am from ' + this.homeTown + '.';
  }
};

// We would need 132 lines of code to model the entire class in object literals like this. There is a better way.

// Constructor function syntax

// function ConstructorFunctionName (parameter1, parameter2) {
//   this.property = parameter1;
//   this.property2 = parameter2;
//   this.staticProperty1 = 'ExampleString';
//   this.method1 = function () {
//     console.log('do stuff');
//   };
// }

//====================
// Student Constructor
//====================

var allStudents = [];

function Student() {}

// Constructor = 12
// Each instance = 1 * 11
// Total lines to model the entire class: 23

//==========================
//Student Prototype Property
//==========================

// new Student instances
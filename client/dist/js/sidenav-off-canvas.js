/**
 * Dependencies: Bootstraps 4 vertical navbar
 * A simple plugin to enable Bootstrap side navbar to active on onclick openNav()/CloseNav() fuction.
 */
// Sidenav bar menu effect
// JavaScript code should be executed in "strict mode"


/* This is Script for mouse click to cancel button */
$(document).ready(() => {
  // Function for navbar close
  $('.closebtn').on('click', () => {
    $('#mysidenav_lft').css('width', '45px');
    $('#sidenav_rgt').css('marginLeft', '0px');
    $('#menu_feature').css('marginLeft', '0px');
    $('.collapse').removeClass('show');
    $('.sidenav_lft').addClass('cls');
    $('.sidenav_lft').removeClass('opn');
    $('.closebtn').removeClass('closebtn-rgt');
    $('.closebtn').css('display', 'none');
    $('.graduation > i,.txt-n,.accordion_in_txt').css('display', 'none');
  });
  // Function for navbar open
  $('.sidenav').on('click', () => {
    $('#mysidenav_lft').css('width', '250px');
    $('#sidenav_rgt').css('marginLeft', '250px');
    $('#menu_feature').css('marginLeft', '250px');
    $('.dummy_card_1').removeClass('arrow-none');
    $('.sidenav_lft').addClass('opn');
    $('.sidenav_lft').removeClass('cls');
    $('.closebtn').addClass('closebtn-rgt');
    $('.closebtn').css('display', 'block');
    $('.graduation > i,.txt-n,.accordion_in_txt').css('display', 'block');
  });

  // Function for navbar open
  $('.ab.sidenav_rgt_open').on('click', () => {
    $('#mysidenav_lft').css('width', '250px');
    $('#sidenav_rgt').css('marginLeft', '250px');
    $('#menu_feature').css('marginLeft', '250px');
    $('.closebtn').css('display', 'block');
    $('.closebtn').addClass('closebtn-rgt');
  });

  // Function for navbar close
  $('.ab.closebtn').on('click', () => {
    $('#mysidenav_lft').css('width', '0px');
    $('#sidenav_rgt').css('marginLeft', '0px');
    $('#menu_feature').css('marginLeft', '0px');
  });
});

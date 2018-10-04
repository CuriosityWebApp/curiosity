/**
* Dependencies: Bootstraps 4 vertical navbar
* A simple plugin to enable Bootstrap side navbar to active on onclick openNav()/CloseNav() fuction.
*/
// Sidenav bar menu effect
//JavaScript code should be executed in "strict mode"
"use strict";
$(document).ready(function(){
				 // Function for navbar open
					$(".sidenav_rgt_open").on('click',function(){
						$('#mysidenav_lft').css('width', '250px');
						$('.closebtn').css("display", "block");
						$('.closebtn').css("position", "fixed");
						$('.closebtn').addClass("closebtn-rgt");
						});						
			 
			     // Function for navbar close
					 $(".closebtn").on('click',function(){
						 $('#mysidenav_lft').css('width', '0px');
						 $('#sidenav_rgt').css('marginLeft', '0px');
						 $('.closebtn').css("display", "none");
					  		});
		
	});
			    // End
         
	  
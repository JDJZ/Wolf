
#!/bin/bash
              ##################################################
              # This script is to start and install wolf!      #
              # This script should not be changed!             #
              ##################################################
PS3='Please enter your choice: '
options=("Install Wolf" "Start Wolf" "Quit")
select opt in "${options[@]}"
do
  case $opt in
      "Install Wolf")

            #pick which one to install
            PS3='Please enter your choice: '
            options=("Install normal Wolf" "Install Music Wolf" "Quit")
            select opt in "${options[@]}"
            do
              case $opt in
                  "Install normal Wolf")
                        while true; do
                        read -p "Do you wish to install this program?" yn
                        case $yn in
                            [Yy]* ) make install; break;;
                            [Nn]* ) exit;;
                            * ) echo "Please answer yes or no.";;
                        esac
                        done
                      ;;
                  "Install Music Wolf")
                        while true; do
                        read -p "Do you wish to install this program?" yn
                        case $yn in
                            [Yy]* ) make install; break;;
                            [Nn]* ) exit;;
                            * ) echo "Please answer yes or no.";;
                        esac
                        done
                      ;;
                  "Quit")
                  echo "Good Bye!"
                      break
                      ;;
                  *) echo invalid option;;
              esac
            done

          ;;
      "Start Wolf")

            #Pick which bot to start
            PS3='Please enter your choice: '
            options=("Start normal Wolf" "Start Music Wolf" "Quit")
            select opt in "${options[@]}"
            do
              case $opt in
                  "Start normal Wolf")
                      cd Desktop/Wolf/Wolf
                      echo "Please Wait.."
                      node bot.js
                      ;;
                  "Start Music Wolf")
                      cd /Users/JDJZ/Desktop/Wolf/Wolf\ Music
                      echo "Please Wait.."
                      node bot.js
                      ;;
                  "Quit")
                  echo "Good Bye!"
                      break
                      ;;
                  *) echo invalid option;;
              esac
            done

          ;;
      "Quit")
      echo "Good Bye!"
          break
          ;;
      *) echo invalid option;;
  esac
done

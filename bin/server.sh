#!/bin/sh
# Absolute path to this script
SCRIPT=$(readlink -f "$0")
# Absolute path to this script, then parent directory
# If the script is in <multi-site root>/bin
ROOT_DIR=$(dirname "$SCRIPT")
ROOT_DIR=$(dirname "$ROOT_DIR")

action="start"

do_action() {
   $ROOT_DIR/node_modules/forever/bin/forever $action -o $ROOT_DIR/proxy.out -e $ROOT_DIR/proxy.err --sourceDir $ROOT_DIR lib/app.js
}

do_start() {
   action="start"
   do_action
}

do_stop() {
   action="stop"
   do_action
}

do_restart() {
   action="restart"
   do_action
}

case "$1" in
        start)
                do_start
                ;;
        stop)
                do_stop
                ;;
        restart)
                do_stop
                do_start
                ;;
        *)
                echo "Usage: $0 {start|stop|restart}"
                RETVAL=1
esac

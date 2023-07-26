# LANFS
LAN File Sharer. It lets you easily share files over your LAN.

Because it would be really insecure and a nightmare to maintain, there's no online version of this. If you just want to see it in action though, I made a [demo video](https://youtu.be/qGhvlKtixlc).

# Introduction
LANFS stands for LAN File Sharer, and is a web app for easily sharing files over your LAN. I made it using SvelteKit (a new metaframework) for the frontend and Express (a Node.js server framework) for the backend.

I made it as a proof of concept for another more complicated project and also to make the occasional task I have of transferring large files easier. Previously I would have to run a HTTP server every time and connect to it, which was rather annoying.

# Installation
Install [Node.js (and npm)](https://nodejs.org/en/download) 16.16 or later. Some older versions will probably work, but I haven't tested them.

Then [download a release](https://github.com/hedgehog125/LANFS/releases), extract it and open a terminal inside its "server" folder. Then run `npm install` for the initial setup and `node index.js` to start it.

It should work now, but I'd recommend setting up a few things if you want to use it more permanently...

<br>
These 2 steps are for Raspberry Pi OS, but might work on other Linux distros. I'd suggest doing this over SSH as it'll make copying and pasting easier (you may need to enable it in the Pi's settings).

## Optional: Configuring a static IP
Before you start, make a quick copy of the current config with `sudo cp /etc/dhcpcd.conf ~/Documents/dhcpcd-backup.conf`

Next we need the gateway IP. Which is the value after it says "default via" when you run `ip r`. As well as the DNS server from `grep "nameserver" /etc/resolv.conf`. Then choose your IP by running `hostname -I` and only changing the last number. Then run `ping <address>` to make sure it's not already being used.

Now edit the network config file with `sudo nano /etc/dhcpcd.conf`. Paste this template in at the bottom and change the placeholders:

```bash
# Static IP
interface <If you're using ethernet, probably eth0, or WiFi is wlan0>

static ip_address=<The static IP to use. Starting with "192.168.">/24
static routers=<Gateway ip>
static domain_name_servers=<DNS server>
```

Press ctrl + X and save and exit. Then reboot with `sudo reboot`. And then run `hostname -I` to check the IP. Also use `ping 8.8.8.8` to make sure it hasn't broken the internet connection. If you want to undo this, you can comment out the lines you added with a hashtag or swap the arguments in the copy command you ran at the start.

Sources: https://thepihut.com/blogs/raspberry-pi-tutorials/how-to-give-your-raspberry-pi-a-static-ip-address-update
https://www.cyberciti.biz/faq/how-to-find-gateway-ip-address/
and https://www.tecmint.com/find-my-dns-server-ip-address-in-linux/

## Optional: Running on startup
Find the path to "startup.sh" in the "server" folder.

Assuming you've already downloaded and installed the program by running `npm install` in the "server" directory, edit the global startup script with `sudo nano /etc/rc.local`. Then put this before "exit 0": `.<absolute path to the LANFS startup.sh file>`. e.g "./home/pi/servers/LANFS/startup.sh".

Then reboot again with `sudo reboot`.

Source: https://www.makeuseof.com/how-to-run-a-raspberry-pi-program-script-at-startup/

# Accessing the web app
By default, it'll be running on port 7000 but it can be changed by setting editing the config.json file, or by setting the "PORT" environment variable (the later takes priority). Access it by typing the IP into the browser followed by a colon, and then the port.

## PWA
While the web app's unfortunately can't be a PWA due to the HTTPS requirement, you can still manually create a shortcut, which will have suitable icons and styling. This is usually under "more options" in the browser, you probably also want to check the option to open it in a new window.

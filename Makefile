.PHONY: test server install clean update

all: build

build:
	npm install
install:
	mkdir -p 		$(DESTDIR)/usr/share/adaxisoft-api
	install server.js	$(DESTDIR)/usr/share/adaxisoft-api/server.js
	install index.js 	$(DESTDIR)/usr/share/adaxisoft-api/index.js
	install config.js 	$(DESTDIR)/usr/share/adaxisoft-api/config.js
	install manifest.js 	$(DESTDIR)/usr/share/adaxisoft-api/manifest.js
	install package.json 	$(DESTDIR)/usr/share/adaxisoft-api/package.json
	cp -a server		$(DESTDIR)/usr/share/adaxisoft-api/server
	cp -a data		$(DESTDIR)/usr/share/adaxisoft-api/data
	cp -a node_modules	$(DESTDIR)/usr/share/adaxisoft-api/node_modules
	mkdir -p		$(DESTDIR)/usr/sbin
	ln -sf /usr/share/adaxisoft-api/server.js $(DESTDIR)/usr/sbin/adaxisoft-api
	chmod +x $(DESTDIR)/usr/share/adaxisoft-api/server.js
test:
	npm test
clean:
	rm -rf node_modules

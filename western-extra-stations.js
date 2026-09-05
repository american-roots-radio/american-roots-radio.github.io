/* TEST ONLY — six verified additions for western desktop validation. */
(() => {
  const extras = {
    country: [
      {
        id: 229,
        name: 'KHYI 95.3 The Range',
        family: 'country',
        genre: 'texas',
        location: 'Dallas / Fort Worth, Texas, USA',
        desc: 'Texas Country and Red Dirt from North Texas',
        icon: '🤠',
        quality: 'MP3',
        url: 'https://streaming.live365.com/a25891'
      },
      {
        id: 230,
        name: 'KPLX 99.5 The Wolf',
        family: 'country',
        genre: 'pop',
        location: 'Dallas, Texas, USA',
        desc: 'Dallas / Fort Worth Country hits and classics',
        icon: '🐺',
        quality: 'AAC',
        url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/KPLXFMAAC_SC'
      }
    ],
    blues: [
      {
        id: 231,
        name: 'Houston Blues Radio',
        family: 'blues',
        genre: 'blues',
        location: 'Houston, Texas, USA',
        desc: 'Texas Gulf Coast Blues and local artists',
        icon: '🎸',
        quality: 'MP3',
        url: 'https://streaming.live365.com/a16858'
      },
      {
        id: 232,
        name: 'The BluzNdaBlood Radio Network',
        family: 'blues',
        genre: 'blues',
        location: 'Roanoke, Virginia, USA',
        desc: '24/7 acoustic, Chicago, contemporary and electric Blues',
        icon: '🩸',
        quality: '128 kbps MP3',
        url: 'https://streaming.live365.com/a56131'
      }
    ],
    gospel: [
      {
        id: 233,
        name: 'Black Gospel Radio 365',
        family: 'gospel',
        genre: 'gospel',
        location: 'Philadelphia, Pennsylvania, USA',
        desc: 'Traditional, contemporary and quartet Gospel 24/7',
        icon: '🎙️',
        quality: 'MP3',
        url: 'https://streaming.live365.com/a24152'
      },
      {
        id: 234,
        name: 'The Gospel Road from Family Life',
        family: 'gospel',
        genre: 'gospel',
        location: 'USA',
        desc: 'Southern Gospel, quartets and Gospel classics from Family Life',
        icon: '🛣️',
        quality: 'MP3',
        url: 'https://streaming.live365.com/a89738_2'
      }
    ]
  };

  const appendUnique = (target, additions) => {
    const names = new Set(target.map(st => String(st.name || '').trim().toLowerCase()));
    const urls = new Set(target.map(st => String(st.url || '').trim().toLowerCase()));
    additions.forEach(st => {
      const nameKey = st.name.trim().toLowerCase();
      const urlKey = st.url.trim().toLowerCase();
      if (!names.has(nameKey) && !urls.has(urlKey)) {
        target.push(st);
        names.add(nameKey);
        urls.add(urlKey);
      }
    });
  };

  appendUnique(countryStations, extras.country);
  appendUnique(bluesStations, extras.blues);
  appendUnique(gospelStations, extras.gospel);

  stations = [...countryStations, ...bluesStations, ...gospelStations, ...customStations];
  updateHeaderCount();
  renderRadios(getFilteredStations());
})();

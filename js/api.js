function procesarSolicitud(url, destinoId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
            <rss version="2.0">
            <channel>`;

            const cveInfo = tempElement.querySelector('#SectionWithNativeTVE-TwoColumnImageDense-BusinessNews-4 > div > div:nth-child(1) > div.Column-imageDenseModRight > div');
            if (cveInfo) {
                var Image = cveInfo.querySelector('div.Card-mediaContainer > a > div > div > picture > img');
                
                Image = Image.src

                rssFeed += `
                    <item>
                    <h2></h2>
                    <img src="${Image}">
                    <p>

                    </p>
                    </item>`;
            }
            console.log(Image)
            rssFeed += `
            </channel>
            </rss>`;

            document.getElementById(destinoId).innerHTML = rssFeed;
        })
        .catch(error => {
            console.error(`Error al obtener la página: ${error.message}`);
        });
}

const criticalurl = 'https://corsproxy.io/?' + encodeURIComponent('https://www.cnbc.com/business/');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    display = "none"
}
else {
    display = "block"
}

procesarSolicitud(criticalurl, 'new-1');
function procesarSolicitud(url, destinoId, num) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
            <rss version="2.0">
            <channel>`;

            if (num <= 2){
                line = 1
            }

            else{
                line = 2
            }

            if (num == 1){
                column = 'div.Column-imageDenseModRight'
            }
            if (num == 2) {
                column = 'div.Column-imageDenseModLeft'
            }
            if (num > 2) {
                subcolumn = num - 2
                column = 'div:nth-child('+subcolumn+')'
            }

            const cveInfo = tempElement.querySelector('#SectionWithNativeTVE-TwoColumnImageDense-BusinessNews-4 > div > div:nth-child('+line+')');
            if (cveInfo) {
                var Title = cveInfo.querySelector(column +' > div > div.Card-textContent > div > div:nth-child(1) > div > div > a');
                var Image = cveInfo.querySelector(column +' > div > div.Card-mediaContainer > a > div > div > picture > img');
                var Info = cveInfo.querySelector(column +' > div > div.Card-textContent > div > div.Card-cardFooter > span.Card-time'); 

                Title = Title.text
                Image = Image.src
                Info = Info.textContent

                rssFeed += `
                    <item>
                    <h2>New ${num}</h2>
                    <h3>${Title}</h3><span class="context">${Info}</span>
                    <img src="${Image}">
                    <p>

                    </p>
                    </item>`;
            }

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

procesarSolicitud(criticalurl, 'new-1', 1);
procesarSolicitud(criticalurl, 'new-2', 2);
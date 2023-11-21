var ysdk;
var leaderBoards; 
var player;

var LEADERBOARD_NAME = 'main'

function initSDK(callback) {
    YaGames.init({
		app: {id: '221438'}
	}).then(_ysdk => {
        ysdk = _ysdk;
		ysdk.features.LoadingAPI?.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть
		
		ysdk.adv.getBannerAdvStatus().then(({ stickyAdvIsShowing , reason }) => {
			if (stickyAdvIsShowing) {
				// реклама показывается
				console.log('реклама показывается');
			} else if(reason) {
				// реклама не показывается
				console.log('реклама not показывается');
				console.log(reason)
			} else {
				ysdk.adv.showBannerAdv();
			}
		});

		ysdk.adv.showFullscreenAdv();


        // Promise.all([ysdk.getLeaderboards(), ysdk.getPlayer()]).then(([_leaderboards, _player]) => {
        //     leaderBoards = _leaderboards
        //     player = _player;
        //     var is_authenticated = player.getMode() !== 'lite'
        //     if (!is_authenticated) {
        //         callback(true, player.getName(), is_authenticated, 0)
        //     } else {
        //         _leaderboards.getLeaderboardEntries(LEADERBOARD_NAME, { includeUser: true, quantityAround: 1 }).then((res) => {
        //             callback(true, player.getName(), is_authenticated, res.userRank)
        //         }).catch(() => {
        //             callback(true, player.getName(), is_authenticated, 0)
        //         })
        //     }
        // })
    })
	.catch(console.error);
	// .catch(() => {
    //     callback(false);
    // });
}

function updatePlayerScore(score) {
    ysdk.getLeaderboards().then(_leaderBoard => {
        _leaderBoard.setLeaderboardScore(LEADERBOARD_NAME, score);
    });
}


// ysdk.isAvailableMethod('leaderboards.setLeaderboardScore')

/**
 * 	YaGames.init({
		app: {id: '221438'}
	}).then(ysdk => {
		console.log('Yandex SDK initialized');
		window.ysdk = ysdk;
		
		ysdk.features.LoadingAPI?.ready(); // Показываем SDK, что игра загрузилась и можно начинать играть
		
		ysdk.adv.getBannerAdvStatus().then(({ stickyAdvIsShowing , reason }) => {
			if (stickyAdvIsShowing) {
				// реклама показывается
				console.log('реклама показывается');
			} else if(reason) {
				// реклама не показывается
				console.log(reason)
			} else {
				ysdk.adv.showBannerAdv()
			}
		});

		ysdk.adv.showFullscreenAdv();
		
		let commonCounter = 0;
		document.querySelector('#showAdsBtn').addEventListener('click', (e) => {
			e.preventDefault();
			
			let counter = 0;
			function getCallback(callbackName) {
				return () => {
					counter += 1;
					commonCounter += 1;

					console.log(`showFullscreenAdv; callback ${callbackName}; ${counter} call`);
				}
			}

			ysdk.adv.showFullscreenAdv({
				callbacks: {
					onClose: getCallback('onClose'),
					onOpen: getCallback('onOpen'),
					onError: getCallback('onError'),
					onOffline: getCallback('onOffline')
				}
			});
		});
	})
	.catch(console.error);
 */
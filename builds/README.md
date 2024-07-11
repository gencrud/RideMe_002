# EXPORT VERSION 3.5.2


Exporting
https://docs.godotengine.org/en/3.5/tutorials/export/exporting_basics.html

Экспорт для Android
https://docs.godotengine.org/ru/3.x/tutorials/export/exporting_for_android.html

Compiling for Android:
https://docs.godotengine.org/ru/3.x/development/compiling/compiling_for_android.html#doc-compiling-for-android

Example screenshot: 
https://user-images.githubusercontent.com/27329423/105272874-820e5280-5b9a-11eb-93bc-ac1bfdadca1c.png

Exporting for the Web:
https://docs.godotengine.org/en/3.5/tutorials/export/exporting_for_web.html#doc-exporting-for-web


Plan:

1. Play to some VK games
2. Create a hidden html button:`user_ids` fot process to `VKWebAppGetUserInfo`: https://dev.vk.com/ru/general/long-id
3. Важно отсылать это сообщение сразу после старта игры, до отсылки других сообщений и длительной загрузки ресурсов. Допустимый интервал — 30 секунд.  
	```js
	bridge.send("VKWebAppInit", {});
	```
4. Проверить: веб-сервер не должен добавлять заголовок `X-Frame-Options` в свои ответы.
5. Добавить показ рекламы;
6. опубликовать игру в каталоге 
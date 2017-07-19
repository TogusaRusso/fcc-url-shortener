# URL Shortener Microservice

## User stories

1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2.  If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3.  When I visit that shortened URL, it will redirect me to my original link.

## Example creation usage

<https://complete-hair.glitch.me/new/http://www.google.com>

<https://complete-hair.glitch.me/new/https://tproger.ru/translations/building-messenger/>

## Example creation output

```javascript
  {
    original_url: "https://tproger.ru/translations/building-messenger/",
    short_url: "https://complete-hair.glitch.me/1"
  }
```

## Example usage

<https://complete-hair.glitch.me/1>

## Wil redirect to

<https://tproger.ru/translations/building-messenger/>


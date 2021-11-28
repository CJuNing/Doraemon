const NetIo = require("../NetIo")

NetIo.html("https://www.cartoonmad.com/comic/3583.html", {
  header: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Cookie:
      "__utmc=5717153; __gads=ID=0dde728465dd6be9-22939f0ba5ce00a8:T=1636692454:RT=1636692454:S=ALNI_MZwi9v6Witpj9WtozXfYn0HaGz5DA; ASPSESSIONIDSUCTSASS=PCJEAGLCMFILOADPOKEMJABA; __utma=5717153.640088801.1636692559.1636692559.1636710130.2; __utmz=5717153.1636710130.2.2.utmcsr=cartoonmad.com|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmt=1; __utmb=5717153.1.10.1636710130",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
  },
}).then(({ string, document }) => {
  console.log(document.querySelector("title").innerHTML)
})

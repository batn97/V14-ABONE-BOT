const { Client, GatewayIntentBits, Partials, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const db = require("croxydb")
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { TOKEN } = require("./config.json");


client.login(process.env.token)
console.log("giriş başarılı")

client.on("messageCreate", async message => {
  if (message.author?.bot) return
let channel = "1023490045451177986"
  if(message.channel.id !== channel) return; 
 const file = message.attachments.first()
 if (!file) return;
  message.delete()
  const row = new Discord.ActionRowBuilder()
  .addComponents(
  new Discord.ButtonBuilder()
  .setLabel("Abone Rolü Ver!")
  .setStyle(Discord.ButtonStyle.Success)
  .setCustomId("abone"),
    new Discord.ButtonBuilder()
    .setLabel("Beğeni Yok")
    .setStyle(Discord.ButtonStyle.Danger)
    .setCustomId("beğeni"),
    new Discord.ButtonBuilder()
    .setLabel("Yorum Yok")
    .setStyle(Discord.ButtonStyle.Danger)
    .setCustomId("yorum"),
        new Discord.ButtonBuilder()
.        setLabel("Abone Yok")
    .setStyle(Discord.ButtonStyle.Danger)
    .setCustomId("aboneyok"),
        new Discord.ButtonBuilder()
.setLabel("Kabul Etme")
.setStyle(Discord.ButtonStyle.Danger)
    .setCustomId("kabul")
  )
  let log = "997487955860009038"
  client.channels.cache.get(log).send({files: [file], components: [row], content: "@everyone @here"}).then((mesaj) => {
  db.set(`kullanıcı_${mesaj.id}`, message.author.id)
  message.author.send("Başarıyla abone fotoğrafın yetkililer gönderildi.").catch(err => {message.channel.send("<@"+message.author.id+"> Başarıyla Abone Fotoğrafın Yetkililere Gönderildi.")})
})
                                                                                   })

        client.on('interactionCreate', async interaction => {
          if (!interaction.isButton()) return;
            let message = await interaction.channel.messages.fetch(interaction.message.id)
          if(interaction.customId === "abone") {
            let rol = "1013797078406791170"
            let usır = db.fetch(`kullanıcı_${interaction.message.id}`)
            message.delete()
            message.guild.members.cache.get(usır).roles.add(rol)
            let rol2 = "1023490045451177986"
client.channels.cache.get(rol2).send("<@"+usır+"> abone rolün verildi.")
          }
            if(interaction.customId === "beğeni") {
            let rol = "1023490045451177986"
                        let usır = db.fetch(`kullanıcı_${interaction.message.id}`)
            message.delete()
client.channels.cache.get(rol).send("<@"+usır+"> Fotoğrafında Beğeni Yok.")
          }
             if(interaction.customId === "yorum") {
            let rol = "1023490045451177986"
                        let usır = db.fetch(`kullanıcı_${interaction.message.id}`)
            message.delete()
client.channels.cache.get(rol).send("<@"+usır+"> Fotoğrafında Yorum Yok.")
          }
             if(interaction.customId === "aboneyok") {
            let rol = "1023490045451177986"
                        let usır = db.fetch(`kullanıcı_${interaction.message.id}`)
            message.delete()
client.channels.cache.get(rol).send("<@"+usır+"> Fotoğrafında Abone Yok.")
          }
        })



const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Raven - Abone Sistemi!')
  const a1 = new TextInputBuilder()
  .setCustomId('red')
  .setLabel('Neden Reddediyorsun?')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Yanlış Kanal')
  .setRequired(true)

    const row = new ActionRowBuilder().addComponents(a1);
  
    modal.addComponents(row);
  
   
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "kabul"){
    await interaction.showModal(modal);
	}
})
 
    client.on('interactionCreate', async interaction => {
      if (interaction.type !== InteractionType.ModalSubmit) return;
                  let message = await interaction.channel.messages.fetch(interaction.message.id)
      if (interaction.customId === 'form') {
        		const sebep = interaction.fields.getTextInputValue('red')
            let rol = "1023490045451177986"
                        let usır = db.fetch(`kullanıcı_${interaction.message.id}`)
            message.delete()
client.channels.cache.get(rol).send("<@"+usır+"> Fotoğrafın Reddedildi.\nSebep: **"+sebep+"**")
        interaction.reply({content: "Başarıyla reddettin.", ephemeral: true})
          }
    
    })







/*
client.on("guildMemberAdd", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", async message => {
  const db = require("croxydb");

  if (await db.get(`afk_${message.author.id}`)) {
   
    db.delete(`afk_${message.author.id}`);

    message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
    message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
  }
});
client.on("guildMemberAdd", member => {
  const rol = db.get(`otorol_${member.guild.id}`)
  if(!rol) return;
  member.roles.add(rol).catch(() => {})

})
client.on("guildMemberAdd", member => {
  const tag = db.get(`ototag_${member.guild.id}`)
  if(!tag) return;
  member.setNickname(`${tag} | ${member.displayName}`)
})
client.on("guildMemberRemove", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:outbox_tray: | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  
  if(kufur) {
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `)
}
}
})
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
  if(!reklamlar) return;
  
  if(reklamlar) {

  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu"
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif! `)
}
}
})

client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
}
}
})
client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)  
  if(interaction.customId == "moderasyon") {
const embed = new Discord.EmbedBuilder()
.setTitle("Godzilla - Yardım Menüsü!")
.setDescription("/ban-list - **Banlı Kullanıcıları Gösterir!**\n/ban - **Bir Üyeyi Yasaklarsın!**\n/emojiler - **Emojileri Görürsün!**\n/forceban - **ID İle Bir Kullanıcıyı Yasaklarsın!**\n/giriş-çıkış - **Giriş çıkış kanalını ayarlarsın!**\n/kanal-açıklama - **Kanalın Açıklamasını Değiştirirsin!**\n/kick - **Bir Üyeyi Atarsın!**\n/küfür-engel - **Küfür Engel Sistemini Açıp Kapatırsın!**\n/oto-rol - **Otorolü Ayarlarsın!**\n/oto-tag - **Oto Tagı Ayarlarsın!**\n/oylama - **Oylama Açarsın!**\n/reklam-engel - **Reklam Engel Sistemini Açarsın!**\n/rol-al - **Rol Alırsın**\n/rol-oluştur - **Rol Oluşturursun!**\n/rol-ver - **Rol Verirsin!**\n/sa-as - **Selam Sistemine Bakarsın!**\n/temizle - **Mesaj Silersin!**\n/unban - **Bir üyenin yasağını kaldırırsın!**")
.setColor("Random")
interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
  if(interaction.customId == "kayıt") {
    const embed = new Discord.EmbedBuilder()
    .setTitle("Godzilla - Yardım Menüsü!")
    .setDescription("/kayıtlı-rol - **Kayıtlı Rolünü Ayarlarsın!**\n/kayıt-et - **Bir Üyeyi Kayıt Edersin!**")
    .setColor("Random")
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
  if(interaction.customId == "kullanıcı") {
    const embed = new Discord.EmbedBuilder()
    .setTitle("Godzilla - Yardım Menüsü!")
    .setDescription("/avatar - **Bir Kullanıcının Avatarına Bakarsın!**\n/afk - **Sebepli Afk Olursun!**\n/emoji-yazı - **Bota Emoji İle Yazı Yazdırırsın!**\n/istatistik - **Bot istatistiklerini gösterir!**\n/kurucu-kim - **Kurucuyu Gösterir!**\n/ping - **Botun pingini gösterir!**\n/yardım - **Yardım Menüsünü Gösterir!**")
    .setColor("Random")
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
})*/
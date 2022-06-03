import discord
import requests

# This script requires development version of discord.py (2.0+)

config = {
    "token": "", # Discord token
    "cid": 0, # Text channel ID
    "vcid": 0, # Voice channel ID
    "url": "http://localhost:9090/PCCCommunity-API/" # NodeCG API endpoint
}

intents = discord.Intents.default()
intents.members = True
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Starting stat collection as {client.user}.')

@client.event
async def on_voice_state_update(member, before, after):
    members = []
    for i in client.get_channel(config["vcid"]).members:
        members.append({"name": i.display_name, "avatar": str(i.avatar.url)})
    requests.post(config["url"] + "vc", json={"members": members})

@client.event
async def on_message(message):
    if message.author == client.user or message.content == "":
        return
    if message.channel.id == config["cid"]:
        requests.post(config["url"] + "chat", json={"name": message.author.display_name, "avatar": str(message.author.avatar.url), "content": message.clean_content})

client.run(config["token"])

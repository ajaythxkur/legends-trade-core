## Commands

# Deploy
```sh
aptos move deploy-object --profile default --address-name legends_trade --named-addresses owner=0xc21eef93e0188165bc9f303e7f8b7f24064db5e6981d1cd092ee4a4b84ac38af --included-artifacts none 
```

# Object Address (testnet)
```sh
0xc5c5217f6ea327d717869fc468a47568afd3e52fd6811bab101089e7d74551a4
```

# Upgrade
```sh
aptos move upgrade-object --address-name legends_trade --object-address 0xc5c5217f6ea327d717869fc468a47568afd3e52fd6811bab101089e7d74551a4 --named-addresses owner=0xc21eef93e0188165bc9f303e7f8b7f24064db5e6981d1cd092ee4a4b84ac38af --included-artifacts none --profile default
```
## Commands

# Deploy
```sh
aptos move deploy-object --profile default --address-name legends_trade --named-addresses owner=0xc21eef93e0188165bc9f303e7f8b7f24064db5e6981d1cd092ee4a4b84ac38af --included-artifacts none 
```

# Object Address (testnet)
```sh
0x92c4ba2415bcd7dad4a3da998d5388d5bc833679b2897b667219fee611a0b003
```

# Upgrade
```sh
aptos move upgrade-object --address-name legends_trade --object-address 0x92c4ba2415bcd7dad4a3da998d5388d5bc833679b2897b667219fee611a0b003 --named-addresses owner=0xc21eef93e0188165bc9f303e7f8b7f24064db5e6981d1cd092ee4a4b84ac38af --included-artifacts none --profile default
```
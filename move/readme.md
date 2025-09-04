## Commands

# Deploy
```sh
aptos move deploy-object --profile default --address-name legends_trade --named-addresses owner=0xc21eef93e0188165bc9f303e7f8b7f24064db5e6981d1cd092ee4a4b84ac38af --included-artifacts none 
```

# Object Address (testnet)
```sh
0x6b03b69b59eb1f4046dd3fd0b8efff2fa93660d2ac5e93970348c729ca47266f
```

# Upgrade
```sh
aptos move upgrade-object --address-name legends_trade --object-address 0x6b03b69b59eb1f4046dd3fd0b8efff2fa93660d2ac5e93970348c729ca47266f --named-addresses owner=0xc21eef93e0188165bc9f303e7f8b7f24064db5e6981d1cd092ee4a4b84ac38af --included-artifacts none --profile default
```
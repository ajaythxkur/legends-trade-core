## Commands

# Deploy
```sh
aptos move deploy-object --profile default --address-name legends_trade --named-addresses owner=<owner_you_want_to_set> --included-artifacts none 
```

# Object Address (testnet)
```sh
0xf244f1427ff756b1aedc034b536d413ee98ca4490a266b0e4d2b66376f8ed721
```

# Upgrade
```sh
aptos move upgrade-object --address-name legends_trade --object-address 0xf244f1427ff756b1aedc034b536d413ee98ca4490a266b0e4d2b66376f8ed721 --named-addresses owner=<owner_you_want_to_set> --included-artifacts none --profile default
```
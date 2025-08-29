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
aptos move upgrade-object --address-name legends_trade --object-address 0x619c125e65b7f92bbb3e784bff20ec6393c384a7ea7341dc317702a743e1e3e2 --named-addresses owner=0x793de02bc1cc8702883c4bd4de3d9381c96f07405cbc6fffa58af656e701a576 --included-artifacts none --profile default
```
## Commands

# Deploy
```sh
aptos move deploy-object --profile default --address-name legends_trade --named-addresses owner=0x793de02bc1cc8702883c4bd4de3d9381c96f07405cbc6fffa58af656e701a576 --included-artifacts none 
```

# Object Address (testnet)
```sh
0xc5c5217f6ea327d717869fc468a47568afd3e52fd6811bab101089e7d74551a4
```

# Upgrade
```sh
aptos move upgrade-object --address-name legends_trade --object-address 0x2c8c445b802dc23545cf7ff061136e64068f0f02e12c2440ccef0b8ea36786b2 --named-addresses owner=0x793de02bc1cc8702883c4bd4de3d9381c96f07405cbc6fffa58af656e701a576 --included-artifacts none --profile default
```
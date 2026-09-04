// GVK Official Ammo Magazines & Blueprints Dataset
const MAGAZINES_BLUEPRINTS_DATA = [
  {
    "subtypeId": "NATO_25x184mm",
    "blueprintSubtype": "001_NATO_25x184mmMagazine",
    "displayName": "*Gatling* 25mm KE x30",
    "category": "Ship Standard Kinetics",
    "icon": "Textures\\GUI\\Icons\\ammo\\Ammo_Box.dds",
    "localIcon": "icons/ammo_NATO_25x184mm.png",
    "capacity": 30,
    "volume": 30.0,
    "mass": 30.0,
    "productionTime": 13.0,
    "roleMultiplier": 1.0,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 4.0,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 53.5,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 13.4,
        "typeId": "Ingot",
        "subtypeId": "Nickel"
      }
    ]
  },
  {
    "subtypeId": "AutocannonClip",
    "blueprintSubtype": "003_AutocannonClip",
    "displayName": "*Chaingun* 30mm API x6",
    "category": "Ship Standard Kinetics",
    "icon": "Textures\\GUI\\Icons\\ammo\\AutoCanonShellBox.dds",
    "localIcon": "icons/ammo_AutocannonClip.png",
    "capacity": 6,
    "volume": 50.0,
    "mass": 80.0,
    "productionTime": 19.0,
    "roleMultiplier": 1.1,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 6.6,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 87.7,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 21.9,
        "typeId": "Ingot",
        "subtypeId": "Nickel"
      },
      {
        "amount": 13.2,
        "typeId": "Ingot",
        "subtypeId": "Cobalt"
      }
    ]
  },
  {
    "subtypeId": "NATO_5p56x45mm",
    "blueprintSubtype": "002_NATO_5p56x45mmMagazine",
    "displayName": "*Interior/Sidearm* 5.56mm KE x30",
    "category": "Ship Standard Kinetics",
    "icon": "Textures\\GUI\\Icons\\ammo\\Rifle_Ammo.dds",
    "localIcon": "icons/ammo_NATO_5p56x45mm.png",
    "capacity": 30,
    "volume": 20.0,
    "mass": 20.0,
    "productionTime": 9.0,
    "roleMultiplier": 1.0,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 2.0,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 20.5,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 5.1,
        "typeId": "Ingot",
        "subtypeId": "Nickel"
      }
    ]
  },
  {
    "subtypeId": "MediumCalibreAmmo",
    "blueprintSubtype": "004_MediumCalibreAmmo",
    "displayName": "*Flak* 100mm HE x1",
    "category": "Heavy Caliber & Flak",
    "icon": "Textures\\GUI\\Icons\\ammo\\MediumCalibreShell.dds",
    "localIcon": "icons/ammo_MediumCalibreAmmo.png",
    "capacity": 1,
    "volume": 40.0,
    "mass": 280.0,
    "productionTime": 16.0,
    "roleMultiplier": 1.1,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 4.7,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 46.7,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 11.7,
        "typeId": "Ingot",
        "subtypeId": "Nickel"
      },
      {
        "amount": 7.0,
        "typeId": "Ingot",
        "subtypeId": "Cobalt"
      }
    ]
  },
  {
    "subtypeId": "LargeCalibreAmmo",
    "blueprintSubtype": "005_LargeCalibreAmmo",
    "displayName": "*L.Cannon* 155mm AP x1",
    "category": "Heavy Caliber & Flak",
    "icon": "Textures\\GUI\\Icons\\ammo\\LargeCalibreShell.dds",
    "localIcon": "icons/ammo_LargeCalibreAmmo.png",
    "capacity": 1,
    "volume": 60.0,
    "mass": 600.0,
    "productionTime": 22.0,
    "roleMultiplier": 1.1,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 7.7,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 77.1,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 19.3,
        "typeId": "Ingot",
        "subtypeId": "Nickel"
      },
      {
        "amount": 11.6,
        "typeId": "Ingot",
        "subtypeId": "Cobalt"
      }
    ]
  },
  {
    "subtypeId": "Ballistics_HeavyCannon",
    "blueprintSubtype": "006_Ballistics_HeavyCannon",
    "displayName": "*H.Cannon* 480mm APHE x1",
    "category": "Heavy Caliber & Flak",
    "icon": "Textures\\GUI\\Icons\\ammo\\AWEHurricaneAmmo.dds",
    "localIcon": "icons/ammo_Ballistics_HeavyCannon.png",
    "capacity": 1,
    "volume": 400.0,
    "mass": 4000.0,
    "productionTime": 150.0,
    "roleMultiplier": 1.25,
    "defaultRUs": 4.5,
    "prerequisites": [
      {
        "amount": 4.5,
        "typeId": "Ingot",
        "subtypeId": "GVK_RUs"
      },
      {
        "amount": 93.4,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 933.9,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 140.1,
        "typeId": "Ingot",
        "subtypeId": "Cobalt"
      },
      {
        "amount": 23.3,
        "typeId": "Ingot",
        "subtypeId": "Silver"
      }
    ]
  },
  {
    "subtypeId": "SmallRailgunAmmo",
    "blueprintSubtype": "007_SmallRailgunAmmo",
    "displayName": "*Railgun* 50mm FeW x1",
    "category": "High-Tech & Strategic",
    "icon": "Textures\\GUI\\Icons\\ammo\\RailgunAmmo.dds",
    "localIcon": "icons/ammo_SmallRailgunAmmo.png",
    "capacity": 1,
    "volume": 130.0,
    "mass": 1300.0,
    "productionTime": 38.0,
    "roleMultiplier": 1.25,
    "defaultRUs": 3.1,
    "prerequisites": [
      {
        "amount": 3.1,
        "typeId": "Ingot",
        "subtypeId": "GVK_RUs"
      },
      {
        "amount": 12.3,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 122.5,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 0.6,
        "typeId": "Ingot",
        "subtypeId": "Uranium"
      },
      {
        "amount": 18.4,
        "typeId": "Ingot",
        "subtypeId": "Cobalt"
      },
      {
        "amount": 3.1,
        "typeId": "Ingot",
        "subtypeId": "Silver"
      }
    ]
  },
  {
    "subtypeId": "LargeRailgunAmmo",
    "blueprintSubtype": "008_LargeRailgunAmmo",
    "displayName": "*MAC* 200mm DU x1",
    "category": "High-Tech & Strategic",
    "icon": "Textures\\GUI\\Icons\\ammo\\RailgunAmmoLarge.dds",
    "localIcon": "icons/ammo_LargeRailgunAmmo.png",
    "capacity": 1,
    "volume": 1330.0,
    "mass": 13300.0,
    "productionTime": 419.0,
    "roleMultiplier": 1.5,
    "defaultRUs": 84.8,
    "prerequisites": [
      {
        "amount": 84.8,
        "typeId": "Ingot",
        "subtypeId": "GVK_RUs"
      },
      {
        "amount": 337.9,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 3378.6,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 16.9,
        "typeId": "Ingot",
        "subtypeId": "Uranium"
      },
      {
        "amount": 506.8,
        "typeId": "Ingot",
        "subtypeId": "Cobalt"
      },
      {
        "amount": 84.5,
        "typeId": "Ingot",
        "subtypeId": "Silver"
      }
    ]
  },
  {
    "subtypeId": "Lasers_Plasma",
    "blueprintSubtype": "014_Lasers_Plasma",
    "displayName": "*Plasma* Plasma Charge x3",
    "category": "High-Tech & Strategic",
    "icon": "Textures\\Icons\\MD_Ammo.dds",
    "localIcon": "icons/ammo_Lasers_Plasma.png",
    "capacity": 3,
    "volume": 240.0,
    "mass": 360.0,
    "productionTime": 72.0,
    "roleMultiplier": 1.5,
    "defaultRUs": 10.2,
    "prerequisites": [
      {
        "amount": 10.2,
        "typeId": "Ingot",
        "subtypeId": "GVK_RUs"
      },
      {
        "amount": 50.4,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 504.3,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 1.3,
        "typeId": "Ingot",
        "subtypeId": "Uranium"
      },
      {
        "amount": 630.4,
        "typeId": "Ingot",
        "subtypeId": "Cobalt"
      },
      {
        "amount": 3.8,
        "typeId": "Ingot",
        "subtypeId": "Gold"
      }
    ]
  },
  {
    "subtypeId": "Missile200mm",
    "blueprintSubtype": "009_Missile200mm",
    "displayName": "*Rocket* Hydra HE x1",
    "category": "Missiles, Rockets & Torpedoes",
    "icon": "Textures\\GUI\\Icons\\ammo\\Small_Rocket.dds",
    "localIcon": "icons/ammo_Missile200mm.png",
    "capacity": 1,
    "volume": 110.0,
    "mass": 80.0,
    "productionTime": 41.0,
    "roleMultiplier": 1.25,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 11.0,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 110.4,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 0.3,
        "typeId": "Ingot",
        "subtypeId": "Platinum"
      },
      {
        "amount": 11.0,
        "typeId": "Ingot",
        "subtypeId": "Silicon"
      }
    ]
  },
  {
    "subtypeId": "Missiles_Missile",
    "blueprintSubtype": "010_Missiles_Missile",
    "displayName": "*L.Missile* Griffin HE x1",
    "category": "Missiles, Rockets & Torpedoes",
    "icon": "Textures\\GUI\\Icons\\HWK_QuadMissileLauncher_Ammo.dds",
    "localIcon": "icons/ammo_Missiles_Missile.png",
    "capacity": 1,
    "volume": 90.0,
    "mass": 140.0,
    "productionTime": 34.0,
    "roleMultiplier": 1.25,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 8.3,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 83.0,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 0.2,
        "typeId": "Ingot",
        "subtypeId": "Platinum"
      },
      {
        "amount": 8.3,
        "typeId": "Ingot",
        "subtypeId": "Silicon"
      },
      {
        "amount": 0.6,
        "typeId": "Ingot",
        "subtypeId": "Gold"
      }
    ]
  },
  {
    "subtypeId": "Missiles_HeavyMissile",
    "blueprintSubtype": "011_Missiles_HeavyMissile",
    "displayName": "*H.Missile* Tuukka HE x1",
    "category": "Missiles, Rockets & Torpedoes",
    "icon": "Textures\\GUI\\Icons\\Items\\mediumMissile01_model.png",
    "localIcon": "icons/ammo_Missiles_HeavyMissile.png",
    "capacity": 1,
    "volume": 300.0,
    "mass": 600.0,
    "productionTime": 86.0,
    "roleMultiplier": 1.25,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 27.5,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 275.1,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 0.7,
        "typeId": "Ingot",
        "subtypeId": "Platinum"
      },
      {
        "amount": 27.5,
        "typeId": "Ingot",
        "subtypeId": "Silicon"
      },
      {
        "amount": 2.1,
        "typeId": "Ingot",
        "subtypeId": "Gold"
      }
    ]
  },
  {
    "subtypeId": "Missiles_Torpedo",
    "blueprintSubtype": "012_Missiles_Torpedo",
    "displayName": "*Torpedo* Crusader EMP x1",
    "category": "Missiles, Rockets & Torpedoes",
    "icon": "Textures\\GUI\\Icons\\CrusaderMissile.png",
    "localIcon": "icons/ammo_Missiles_Torpedo.png",
    "capacity": 1,
    "volume": 1500.0,
    "mass": 2250.0,
    "productionTime": 354.0,
    "roleMultiplier": 1.5,
    "defaultRUs": 96.1,
    "prerequisites": [
      {
        "amount": 96.1,
        "typeId": "Ingot",
        "subtypeId": "GVK_RUs"
      },
      {
        "amount": 1276.8,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 12768.1,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 31.9,
        "typeId": "Ingot",
        "subtypeId": "Platinum"
      },
      {
        "amount": 1276.8,
        "typeId": "Ingot",
        "subtypeId": "Silicon"
      },
      {
        "amount": 95.9,
        "typeId": "Ingot",
        "subtypeId": "Gold"
      }
    ]
  },
  {
    "subtypeId": "Missiles_Siege",
    "blueprintSubtype": "013_Missiles_Siege",
    "displayName": "*SRBM* Longsword MRV x1",
    "category": "Missiles, Rockets & Torpedoes",
    "icon": "Textures\\GUI\\Icons\\AWESabreMissile.dds",
    "localIcon": "icons/ammo_Missiles_Siege.png",
    "capacity": 1,
    "volume": 340.0,
    "mass": 680.0,
    "productionTime": 98.0,
    "roleMultiplier": 1.5,
    "defaultRUs": 10.6,
    "prerequisites": [
      {
        "amount": 10.6,
        "typeId": "Ingot",
        "subtypeId": "GVK_RUs"
      },
      {
        "amount": 140.9,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 1408.6,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 3.5,
        "typeId": "Ingot",
        "subtypeId": "Platinum"
      },
      {
        "amount": 140.9,
        "typeId": "Ingot",
        "subtypeId": "Silicon"
      },
      {
        "amount": 10.6,
        "typeId": "Ingot",
        "subtypeId": "Gold"
      }
    ]
  },
  {
    "subtypeId": "Others_Drone_Falcon",
    "blueprintSubtype": "015_Others_Drone_Falcon",
    "displayName": "*Drone* Falcon Gunship x1",
    "category": "Missiles, Rockets & Torpedoes",
    "icon": "Textures\\GUI\\Icons\\ammo\\AWE_Drone_Falcon.dds",
    "localIcon": "icons/ammo_Others_Drone_Falcon.png",
    "capacity": 1,
    "volume": 1150.0,
    "mass": 1730.0,
    "productionTime": 268.0,
    "roleMultiplier": 1.5,
    "defaultRUs": 26.7,
    "prerequisites": [
      {
        "amount": 26.7,
        "typeId": "Ingot",
        "subtypeId": "GVK_RUs"
      },
      {
        "amount": 354.4,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      },
      {
        "amount": 3543.9,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 8.9,
        "typeId": "Ingot",
        "subtypeId": "Platinum"
      },
      {
        "amount": 354.4,
        "typeId": "Ingot",
        "subtypeId": "Silicon"
      },
      {
        "amount": 26.6,
        "typeId": "Ingot",
        "subtypeId": "Gold"
      }
    ]
  },
  {
    "subtypeId": "FlareClip",
    "blueprintSubtype": "016_FlareGunMagazine",
    "displayName": "*Flare* Decoy Flare x4",
    "category": "Countermeasures & Decoys",
    "icon": "Textures\\GUI\\Icons\\ammo\\FlareGun_Ammo.dds",
    "localIcon": "icons/ammo_default.png",
    "capacity": 4,
    "volume": 6.0,
    "mass": 1.0,
    "productionTime": 10.0,
    "roleMultiplier": 1.0,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 0.2,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 0.05,
        "typeId": "Ingot",
        "subtypeId": "Nickel"
      },
      {
        "amount": 0.02,
        "typeId": "Ingot",
        "subtypeId": "Silver"
      },
      {
        "amount": 0.01,
        "typeId": "Ingot",
        "subtypeId": "Gold"
      }
    ]
  },
  {
    "subtypeId": "FireworksBoxRainbow",
    "blueprintSubtype": "017_FireworksBoxRainbow",
    "displayName": "*Flare* Fireworks Box x8",
    "category": "Countermeasures & Decoys",
    "icon": "Textures\\GUI\\Icons\\ammo\\FireworksBox.dds",
    "localIcon": "icons/ammo_default.png",
    "capacity": 30,
    "volume": 60.0,
    "mass": 10.0,
    "productionTime": 8.0,
    "roleMultiplier": 1.0,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 0.5,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 0.5,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      }
    ]
  },
  {
    "subtypeId": "ElitePistolMagazine",
    "blueprintSubtype": "ElitePistolMagazine",
    "displayName": "*Sidearm* 9mm KE x10",
    "category": "Handheld & Small Arms",
    "icon": "Textures\\GUI\\Icons\\ammo\\Pistol_Warfare_Ammo.dds",
    "localIcon": "icons/ammo_default.png",
    "capacity": 10,
    "volume": 0.1,
    "mass": 0.15,
    "productionTime": 5.0,
    "roleMultiplier": 1.0,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 5.0,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 2.0,
        "typeId": "Ingot",
        "subtypeId": "Nickel"
      }
    ]
  },
  {
    "subtypeId": "UltimateAutomaticRifleGun_Mag_30rd",
    "blueprintSubtype": "UltimateAutomaticRifleGun_Mag_30rd",
    "displayName": "*Sidearm* 7.62mm FMJ x20",
    "category": "Handheld & Small Arms",
    "icon": "Textures\\GUI\\Icons\\ammo\\Rifle_Ammo_SemiAuto.dds",
    "localIcon": "icons/ammo_default.png",
    "capacity": 20,
    "volume": 0.2,
    "mass": 0.9,
    "productionTime": 15.0,
    "roleMultiplier": 1.0,
    "defaultRUs": 0,
    "prerequisites": [
      {
        "amount": 20.0,
        "typeId": "Ingot",
        "subtypeId": "Iron"
      },
      {
        "amount": 5.0,
        "typeId": "Ingot",
        "subtypeId": "Nickel"
      },
      {
        "amount": 0.6,
        "typeId": "Ingot",
        "subtypeId": "Magnesium"
      }
    ]
  }
];

const db = require('../models');
const Users = db.users;

const Discussions = db.discussions;

const HousingTransitScores = db.housing_transit_scores;

const Properties = db.properties;

const Reports = db.reports;

const Tenants = db.tenants;

const DiscussionsData = [
  {
    topic: 'Affordable Housing Initiatives',

    content: 'Discussion on new affordable housing projects',

    // type code here for "relation_one" field
  },

  {
    topic: 'Public Transit Improvements',

    content: 'Ideas for improving city transit',

    // type code here for "relation_one" field
  },

  {
    topic: 'Community Safety Measures',

    content: 'Strategies to enhance neighborhood safety',

    // type code here for "relation_one" field
  },

  {
    topic: 'Green Urban Spaces',

    content: 'Expanding parks and green areas',

    // type code here for "relation_one" field
  },
];

const HousingTransitScoresData = [
  {
    // type code here for "relation_one" field

    affordability_score: 80,

    commute_efficiency_score: 70,

    transit_reliability_score: 75,

    accessibility_score: 85,

    safety_infrastructure_score: 90,

    overall_score: 80,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    affordability_score: 75,

    commute_efficiency_score: 80,

    transit_reliability_score: 70,

    accessibility_score: 80,

    safety_infrastructure_score: 85,

    overall_score: 78,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    affordability_score: 85,

    commute_efficiency_score: 65,

    transit_reliability_score: 80,

    accessibility_score: 75,

    safety_infrastructure_score: 80,

    overall_score: 77,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    affordability_score: 70,

    commute_efficiency_score: 75,

    transit_reliability_score: 85,

    accessibility_score: 80,

    safety_infrastructure_score: 75,

    overall_score: 77,

    // type code here for "relation_one" field
  },
];

const PropertiesData = [
  {
    address: '123 Main St, Springfield',

    rent_price: 1200,

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    address: '456 Elm St, Metropolis',

    rent_price: 1500,

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    address: '789 Oak St, Gotham',

    rent_price: 900,

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    address: '101 Maple Ave, Star City',

    rent_price: 1100,

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const ReportsData = [
  {
    title: 'Broken Elevator',

    description: 'Elevator not working at 123 Main St',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Transit Delay',

    description: 'Bus route 5 consistently late',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Unsafe Sidewalk',

    description: 'Cracked sidewalk on Elm St',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Noisy Neighbors',

    description: 'Loud music at night on Oak St',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const TenantsData = [
  {
    name: 'Urban Living',
  },

  {
    name: 'Transit Connect',
  },

  {
    name: 'Green Spaces',
  },

  {
    name: 'Safe Streets',
  },
];

// Similar logic for "relation_many"

async function associateUserWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setTenant) {
    await User0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setTenant) {
    await User1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setTenant) {
    await User2.setTenant(relatedTenant2);
  }

  const relatedTenant3 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setTenant) {
    await User3.setTenant(relatedTenant3);
  }
}

async function associateDiscussionWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Discussion0 = await Discussions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Discussion0?.setTenant) {
    await Discussion0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Discussion1 = await Discussions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Discussion1?.setTenant) {
    await Discussion1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Discussion2 = await Discussions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Discussion2?.setTenant) {
    await Discussion2.setTenant(relatedTenant2);
  }

  const relatedTenant3 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Discussion3 = await Discussions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Discussion3?.setTenant) {
    await Discussion3.setTenant(relatedTenant3);
  }
}

async function associateHousingTransitScoreWithProperty() {
  const relatedProperty0 = await Properties.findOne({
    offset: Math.floor(Math.random() * (await Properties.count())),
  });
  const HousingTransitScore0 = await HousingTransitScores.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (HousingTransitScore0?.setProperty) {
    await HousingTransitScore0.setProperty(relatedProperty0);
  }

  const relatedProperty1 = await Properties.findOne({
    offset: Math.floor(Math.random() * (await Properties.count())),
  });
  const HousingTransitScore1 = await HousingTransitScores.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (HousingTransitScore1?.setProperty) {
    await HousingTransitScore1.setProperty(relatedProperty1);
  }

  const relatedProperty2 = await Properties.findOne({
    offset: Math.floor(Math.random() * (await Properties.count())),
  });
  const HousingTransitScore2 = await HousingTransitScores.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (HousingTransitScore2?.setProperty) {
    await HousingTransitScore2.setProperty(relatedProperty2);
  }

  const relatedProperty3 = await Properties.findOne({
    offset: Math.floor(Math.random() * (await Properties.count())),
  });
  const HousingTransitScore3 = await HousingTransitScores.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (HousingTransitScore3?.setProperty) {
    await HousingTransitScore3.setProperty(relatedProperty3);
  }
}

async function associateHousingTransitScoreWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const HousingTransitScore0 = await HousingTransitScores.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (HousingTransitScore0?.setTenant) {
    await HousingTransitScore0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const HousingTransitScore1 = await HousingTransitScores.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (HousingTransitScore1?.setTenant) {
    await HousingTransitScore1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const HousingTransitScore2 = await HousingTransitScores.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (HousingTransitScore2?.setTenant) {
    await HousingTransitScore2.setTenant(relatedTenant2);
  }

  const relatedTenant3 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const HousingTransitScore3 = await HousingTransitScores.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (HousingTransitScore3?.setTenant) {
    await HousingTransitScore3.setTenant(relatedTenant3);
  }
}

async function associatePropertyWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Property0 = await Properties.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Property0?.setTenant) {
    await Property0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Property1 = await Properties.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Property1?.setTenant) {
    await Property1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Property2 = await Properties.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Property2?.setTenant) {
    await Property2.setTenant(relatedTenant2);
  }

  const relatedTenant3 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Property3 = await Properties.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Property3?.setTenant) {
    await Property3.setTenant(relatedTenant3);
  }
}

// Similar logic for "relation_many"

async function associatePropertyWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Property0 = await Properties.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Property0?.setTenant) {
    await Property0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Property1 = await Properties.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Property1?.setTenant) {
    await Property1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Property2 = await Properties.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Property2?.setTenant) {
    await Property2.setTenant(relatedTenant2);
  }

  const relatedTenant3 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Property3 = await Properties.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Property3?.setTenant) {
    await Property3.setTenant(relatedTenant3);
  }
}

async function associateReportWithProperty() {
  const relatedProperty0 = await Properties.findOne({
    offset: Math.floor(Math.random() * (await Properties.count())),
  });
  const Report0 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Report0?.setProperty) {
    await Report0.setProperty(relatedProperty0);
  }

  const relatedProperty1 = await Properties.findOne({
    offset: Math.floor(Math.random() * (await Properties.count())),
  });
  const Report1 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Report1?.setProperty) {
    await Report1.setProperty(relatedProperty1);
  }

  const relatedProperty2 = await Properties.findOne({
    offset: Math.floor(Math.random() * (await Properties.count())),
  });
  const Report2 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Report2?.setProperty) {
    await Report2.setProperty(relatedProperty2);
  }

  const relatedProperty3 = await Properties.findOne({
    offset: Math.floor(Math.random() * (await Properties.count())),
  });
  const Report3 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Report3?.setProperty) {
    await Report3.setProperty(relatedProperty3);
  }
}

async function associateReportWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report0 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Report0?.setUser) {
    await Report0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report1 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Report1?.setUser) {
    await Report1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report2 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Report2?.setUser) {
    await Report2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Report3 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Report3?.setUser) {
    await Report3.setUser(relatedUser3);
  }
}

async function associateReportWithTenant() {
  const relatedTenant0 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Report0 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Report0?.setTenant) {
    await Report0.setTenant(relatedTenant0);
  }

  const relatedTenant1 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Report1 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Report1?.setTenant) {
    await Report1.setTenant(relatedTenant1);
  }

  const relatedTenant2 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Report2 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Report2?.setTenant) {
    await Report2.setTenant(relatedTenant2);
  }

  const relatedTenant3 = await Tenants.findOne({
    offset: Math.floor(Math.random() * (await Tenants.count())),
  });
  const Report3 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Report3?.setTenant) {
    await Report3.setTenant(relatedTenant3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Discussions.bulkCreate(DiscussionsData);

    await HousingTransitScores.bulkCreate(HousingTransitScoresData);

    await Properties.bulkCreate(PropertiesData);

    await Reports.bulkCreate(ReportsData);

    await Tenants.bulkCreate(TenantsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithTenant(),

      await associateDiscussionWithTenant(),

      await associateHousingTransitScoreWithProperty(),

      await associateHousingTransitScoreWithTenant(),

      await associatePropertyWithTenant(),

      // Similar logic for "relation_many"

      await associatePropertyWithTenant(),

      await associateReportWithProperty(),

      await associateReportWithUser(),

      await associateReportWithTenant(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('discussions', null, {});

    await queryInterface.bulkDelete('housing_transit_scores', null, {});

    await queryInterface.bulkDelete('properties', null, {});

    await queryInterface.bulkDelete('reports', null, {});

    await queryInterface.bulkDelete('tenants', null, {});
  },
};

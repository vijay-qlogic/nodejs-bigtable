/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const snippets = {
  createInstance: (instanceId, clusterId) => {
    // [START bigtable_create_instance]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // [START bigtable_create_instance]
    // options for a PRODUCTION Instance
    // const options = {
    //   clusters: [
    //     {
    //       name: clusterId,
    //       nodes: 3,
    //       location: 'us-central1-f',
    //       storage: 'ssd',
    //     },
    //   ],
    //   type: 'PRODUCTION', // Optional as default type is PRODUCTION
    // };

    // options for a DEVELOPMENT Instance
    const options = {
      clusters: [
        {
          name: clusterId,
          location: 'us-central1-f',
          storage: 'hdd',
        },
      ],
      type: 'DEVELOPMENT',
    };

    // creates a new Instance
    await instance
      .create(options)
      .then(result => {
        const newInstance = result[0];
        // let operations = result[1];
        // let apiResponse = result[2];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_create_instance]

    callback();
  },

  createCluster: (instanceId, clusterId) => {
    // [START bigtable_create_cluster]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // [START bigtable_create_cluster]
    // const options = {
    //   location: 'us-central1-b',
    //   nodes: 3,
    //   storage: 'ssd',
    // };
    const options = {
      location: 'us-central1-b',
      storage: 'hdd',
    };
    instance
      .createCluster(clusterId, options)
      .then(result => {
        const newCluster = result[0];
        // const operations = result[1];
        // const apiResponse = result[2];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_create_cluster]

    callback();
  },

  createAppProfile: async (instanceId, clusterId, appProfileId, callback) => {
    const instance = bigtable.instance(instanceId);

    // [START bigtable_create_app_profile]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const cluster = instance.cluster(clusterId);

    const options = {
      routing: cluster,
      allowTransactionalWrites: true,
      ignoreWarnings: true,
    };

    instance.createAppProfile(appProfileId, options, (err, appProfile) => {
      if (err) {
        // Handle the error.
        return callback(err);
      }
      return callback(appProfile);
    });
    // [END bigtable_create_app_profile]

    callback();
  },

  createTable: (instanceId, tableId) => {
    // [START bigtable_create_table]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // [START bigtable_create_table]
    const options = {
      families: ['follows'],
    };

    // You can also specify garbage collection rules for your column families.
    // See {@link Table#createFamily} for more information about
    // column families and garbage collection rules.
    //-
    // const options = {
    //   families: [
    //     {
    //       name: 'follows',
    //       rule:  {
    //         age: {
    //           seconds: 0,
    //           nanos: 5000
    //         },
    //         versions: 3,
    //         union: true
    //       }
    //     }
    //   ]
    // };

    await instance
      .createTable(tableId, options)
      .then(result => {
        const newTable = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_create_table]

    callback();
  },

  existsInstance: instanceId => {
    // [START bigtable_exists_instance]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .exists()
      .then(result => {
        const exists = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_exists_instance]

    callback();
  },

  getInstance: instanceId => {
    // [START bigtable_get_instance]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    let caughtError = false;

    instance
      .get()
      .then(result => {
        const instance = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_instance]

    callback();
  },

  getClusters: instanceId => {
    // [START bigtable_get_clusters]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    let caughtError = false;

    instance
      .getClusters()
      .then(result => {
        const clusters = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_clusters]

    callback();
  },

  getAppProfiles: instanceId => {
    // [START bigtable_get_app_profiles]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    let caughtError = false;

    instance
      .getAppProfiles()
      .then(result => {
        const appProfiles = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_app_profiles]

    callback();
  },

  getMetadata: instanceId => {
    // [START bigtable_get_instance_metadata]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    let caughtError = false;

    instance
      .getMetadata()
      .then(result => {
        const metaData = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_instance_metadata]

    callback();
  },

  getTables: instanceId => {
    // [START bigtable_get_tables]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // To control how many API requests are made and page through the results
    // manually, set `autoPaginate` to false.
    const options = {
      autoPaginate: false,
    };
    // const options = {
    //   autoPaginate: true
    // };

    await instance
      .getTables(options)
      .then(result => {
        const tables = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_tables]

    callback();
  },

  updateInstance: instanceId => {
    // [START bigtable_set_meta_data]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const metadata = {
      displayName: 'updated-name',
    };

    await instance
      .setMetadata(metadata)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_set_meta_data]

    callback();
  },

  delInstance: instanceId => {
    // [START bigtable_del_instance]
    const Bigtable = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .delete()
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_del_instance]

    callback();
  },
};

module.exports = snippets;

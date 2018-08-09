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

const Bigtable = require('@google-cloud/bigtable');
const bigtable = new Bigtable();

const snippets = {
  createRow: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_create_row]
    const row = table.row('samplerow');

    row
      .create()
      .then(result => {
        let apiResponse = result[0];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_create_row]

    callback();
  },

  createRules: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_create_rules]
    const row = table.row('samplerow');
    // -
    // Add an increment amount to an existing value, if the targeted cell is
    // unset, it will be treated as containing a zero.
    //
    var rules = [
      {
        column: 'follows:gwashington',
        increment: 1,
      },
    ];

    // -
    // You can also create a rule that will append data to an existing value.
    // If the targeted cell is unset, it will be treated as a containing an
    // empty string.
    //
    // var rules = [
    //   {
    //     column: 'follows:alincoln',
    //     append: ' Honest Abe!',
    //   },
    // ];

    row
      .createRules(rules)
      .then(result => {
        let apiResponse = result[0];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_create_rules]

    callback();
  },

  deleteAllCells: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_delete_all_cells]
    const row = table.row('samplerow');
    row
      .delete()
      .then(function(data) {
        let apiResponse = data[0];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_delete_all_cells]

    callback();
  },

  deleteCells: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_delete_particular_cells]
    const row = table.row('samplerow');

    // Delete selective cell within a family.
    // let cells = [
    //   'follows:gwashington'
    // ];

    // Delete all cells within a family.
    let cells = ['follows'];

    row
      .deleteCells(cells)
      .then(result => {
        let apiResponse = result[0];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_delete_particular_cells]

    callback();
  },

  exists: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_row_exists]
    const row = table.row('samplerow');

    row
      .exists()
      .then(result => {
        let exists = result[0];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_row_exists]

    callback();
  },

  filter: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_row_filter]
    const row = table.row('samplerow');

    let filter = [
      {
        family: 'follows',
      },
      {
        column: 'alincoln',
      },
      {
        value: 1,
      },
    ];

    // Optionally, you can pass in an array of entries to be ran in the event
    // that a match is not made.
    let config = {
      onNoMatch: [
        {
          method: 'insert',
          data: {
            follows: {
              jadams: 1,
            },
          },
        },
      ],
    };

    row
      .filter(filter, config)
      .then(data => {
        var matched = data[0];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_row_filter]

    callback();
  },

  get: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_get_row]
    const row = table.row('samplerow');

    row
      .get()
      .then(result => {
        let row = result[0];
      })
      .catch(err => {
        // handle error
      });

    //-
    // Or pass in an array of column names to populate specific cells.
    // Under the hood this will create an interleave filter.
    //-
    // row
    //   .get([
    //     'follows:gwashington',
    //     'follows:alincoln'
    //   ])
    //   .then(result => {
    //     let row = result[0];
    //   })
    //   .catch(err => {
    //     // handle error
    //   });

    // [END bigtable_get_row]

    callback();
  },

  getMetadata: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_get_row_meta]
    const row = table.row('samplerow');

    row
      .getMetadata()
      .then(result => {
        let metaData = result[0];
        let apiResponse = result[1];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_get_row_meta]

    callback();
  },

  increment: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_row_increment]
    const row = table.row('samplerow');

    // Specify a custom amount to increment the column by.
    // row
    //   .increment('follows:gwashington', 2)
    //   .then(result => {
    //     let value = result[0];
    //     let apiResponse = result[1];
    // });

    // To decrement a column, simply supply a negative value.
    // row
    //   .increment('follows:gwashington', -1)
    //   .then(result => {
    //     let value = result[0];
    //     let apiResponse = result[1];
    // });
    row
      .increment('follows:gwashington')
      .then(result => {
        let value = result[0];
        let apiResponse = result[1];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_row_increment]

    callback();
  },

  save: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_row_save]
    const row = table.row('samplerow');
    let entry = {
      follows: {
        jadams: 1,
      },
    };
    row
      .save(entry)
      .then(result => {
        let apiResponse = result[0];
      })
      .catch(err => {
        // handle error
      });
    // [END bigtable_row_save]

    callback();
  },
};

module.exports = snippets;

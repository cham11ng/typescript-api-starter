import Bookshelf from 'bookshelf';

import knex from './knex';

const bookshelf: Bookshelf = Bookshelf(knex);

bookshelf.plugin('bookshelf-case-converter-plugin');

export default bookshelf;

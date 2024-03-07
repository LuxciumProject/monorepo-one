export const NODE_ENV = (default_ = 'dev') => process.env['NODE_ENV']?.toLocaleLowerCase() || default_;

var helpers = require( 'swig/lib/helpers' );

exports.url = function (indent, parser) {
    output = [];
    pattern = parser.parseVariable(this.args[0]);
    kwargs = this.args[1];
    //console.log(this.args[2]);
    output.push(helpers.setVar('_pattern', pattern));
    //output.push(helpers.setVar('_kwargs', kwargs));
    //output.push('console.log(_context);');
    output.push('_output += _ext.router.build(_pattern, ' + kwargs + ');');
    console.log( output );
    return output.join('');
};
exports.url.ends = false;

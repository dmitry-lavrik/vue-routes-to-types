import type { IsNumber, IsOptional, IsRepeatable } from './../lib/meta'

/* If just one line is red it is very bad */

// numbers
{ const _: IsNumber<':name', ':name(\\d)'> = true; }
{ const _: IsNumber<':name', ':name(\\d)+'> = true; }
{ const _: IsNumber<':name', ':name(\\d)*'> = true; }
{ const _: IsNumber<':name', ':name(\\d)?'> = true; }
{ const _: IsNumber<':name', ':name(\\d)-tail'> = true; }
{ const _: IsNumber<':name', ':name(\\d)+-tail'> = true; }
{ const _: IsNumber<':name', ':name(\\d)*-tail'> = true; }
{ const _: IsNumber<':name', ':name(\\d)?-tail'> = true; }
{ const _: IsNumber<':name', ':name(\\d+)'> = true; }
{ const _: IsNumber<':name', ':name(\\d+)?-tail'> = true; }

// strings
{ const _: IsNumber<':name', ':name'> = false; }
{ const _: IsNumber<':name', ':name+'> = false; }
{ const _: IsNumber<':name', ':name*'> = false; }
{ const _: IsNumber<':name', ':name?'> = false; }
{ const _: IsNumber<':name', ':name-tail'> = false; }
{ const _: IsNumber<':name', ':name+-tail'> = false; }
{ const _: IsNumber<':name', ':name*-tail'> = false; }
{ const _: IsNumber<':name', ':name?-tail'> = false; }
{ const _: IsNumber<':name', ':name(\\d{2})'> = false; } // can not detect it like number
{ const _: IsNumber<':name', ':name(\\d+-\d)-tail'> = false; }
{ const _: IsNumber<':name', ':name(\\d*)'> = false; } // in standart login it is false, because can be ''

// custom detectors
{ const _: IsNumber<':name', ':name(\\d)'> = true; } 
{ const _: IsNumber<':name', ':name(\\d)', []> = false; } // empty detectors -> always string
{ const _mbYearAsSample: IsNumber<':name', ':name(\\d{4})', []> = false; }
{ const _: IsNumber<':name', ':name(\\d)', ['\\d','\\d+', '\\d{4}']> = true; } 
{ const _mbYearAsSample: IsNumber<':name', ':name(\\d{4})', ['\\d','\\d+', '\\d{4}']> = true; }


// optional
{ const _: IsOptional<':name', ':name?'> = true; }
{ const _: IsOptional<':name', ':name()?'> = true; }
{ const _: IsOptional<':name', ':name(\\d)?'> = true; }
{ const _: IsOptional<':name', ':name*'> = true; }
{ const _: IsOptional<':name', ':name(\\d)*'> = true; }

// required
{ const _: IsOptional<':name', ':name'> = false; }
{ const _: IsOptional<':name', ':name()'> = false; }
{ const _: IsOptional<':name', ':name(\\d)'> = false; }
{ const _: IsOptional<':name', ':name+'> = false; }
{ const _: IsOptional<':name', ':name(\\d)+'> = false; }

// repeatable
{ const _: IsRepeatable<':name', ':name+'> = true; }
{ const _: IsRepeatable<':name', ':name*'> = true; }
{ const _: IsRepeatable<':name', ':name(\\d)+'> = true; }
{ const _: IsRepeatable<':name', ':name(\\d)*'> = true; }
{ const _: IsRepeatable<':name', ':name(\\d)*-tail'> = true; }

// signle
{ const _: IsRepeatable<':name', ':name?'> = false; }
{ const _: IsRepeatable<':name', ':name(.*)'> = false; }
{ const _: IsRepeatable<':name', ':name(\\d+)'> = false; }
{ const _: IsRepeatable<':name', ':name(\\d)-tail'> = false; }
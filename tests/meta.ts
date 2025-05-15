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

// strings
{ const _: IsNumber<':name', ':name'> = false; }
{ const _: IsNumber<':name', ':name+'> = false; }
{ const _: IsNumber<':name', ':name*'> = false; }
{ const _: IsNumber<':name', ':name?'> = false; }
{ const _: IsNumber<':name', ':name-tail'> = false; }
{ const _: IsNumber<':name', ':name+-tail'> = false; }
{ const _: IsNumber<':name', ':name*-tail'> = false; }
{ const _: IsNumber<':name', ':name?-tail'> = false; }

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
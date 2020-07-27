# spo site list

```ts
interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

function updateUser(id: number, update: Partial<User>) {
  const user = getUser(id)
  const newUser = {...user, ...update}  
  saveUser(id, user)
}
```

```typescript
interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

function updateUser(id: number, update: Partial<User>) {
  const user = getUser(id)
  const newUser = {...user, ...update}  
  saveUser(id, user)
}
```

Lists modern sites of the given type

## Usage

```shell-session
spo site list [options]
```

## Options

Option|Description
------|-----------
`--help`|output usage information
`--type [type]`|type of modern sites to list. Allowed values `TeamSite,CommunicationSite`, default `TeamSite`
`-f, --filter [filter]`|filter to apply when retrieving sites
`--deleted`|use this switch to only return deleted sites
`--query [query]`|JMESPath query string. See [http://jmespath.org/](http://jmespath.org/) for more information and examples
`-o, --output [output]`|Output type. `json,text`. Default `text`
`--pretty`|Prettifies `json` output
`--verbose`|Runs command with verbose logging
`--debug`|Runs command with debug logging

!!! important
    To use this command you have to have permissions to access the tenant admin site.

## Remarks

Using the `-f, --filter` option you can specify which sites you want to retrieve. For example, to get sites with _project_ in their URL, use `Url -like 'project'` as the filter.

When using the text output type (default), the command lists only the values of the `Title`, and `Url` properties of the site. When setting the output type to JSON, all available properties are included in the command output.

## Examples

List all modern team sites in the currently connected tenant

```shell-session
$ spo site list
```

List all modern team sites in the currently connected tenant

```shell-session
$ spo site list --type TeamSite
```

List all modern communication sites in the currently connected tenant

```shell-session
$ spo site list --type CommunicationSite
```

List all modern team sites that contain _project_ in the URL

```shell-session
$ spo site list --type TeamSite --filter "Url -like 'project'"
```

List all deleted sites in the tenant you're logged in to

```shell-session
$ spo site list --deleted
```

```console
c:\temp> hello -world -userid "abc"
Hello World abc
Error: There is something wrong in the state of Denmark.
> Console test
```

```shell
$ hello -world -userid "abc"
> hello -world -userid "abc"
Hello World abc
Error: There is something wrong in the state of Denmark.
> shell test
```

```bash
$ hello -world -userid "abc"
Hello World abc
Error: "There is something wrong in the state of Denmark."
> bash test
```

```bash session
$ hello -world -userid "abc"
Hello World abc
Error: There is something wrong in the state of Denmark.
> bash test
```

```shell-session
$ hello -world -userid "abc"
Hello World abc
Error: There is something wrong in the state of Denmark.
> shell-session
```


# Definiton list

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.

# Markdown Headline 1

This is just a sample SCSS output:

```scss
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);

@font-face {
	src: url(https://lea.verou.me/logo.otf);
	font-family: 'LeaVerou';
}

/*
 Shared styles
 */

section h1,
#features li strong,
header h2,
footer p {
	font: 100% Rockwell, Arvo, serif;
}

/*
 Styles
 */

* {
	margin: 0;
	padding: 0;
}

```

That is all.
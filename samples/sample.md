```powershell
#// Start of script 
#// Get year and month for csv export file 
$DateTime = Get-Date -f "yyyy-MM" 
 
#// Set CSV file name 
$CSVFile = "C:\AD_Groups"+$DateTime+".csv" 
 
#// Create emy array for CSV data 
$CSVOutput = @() 
 
#// Get all AD groups in the domain 
$ADGroups = Get-ADGroup -Filter * 
 
#// Set progress bar variables 
$i=0 
$tot = $ADGroups.count 
 
foreach ($ADGroup in $ADGroups) { 
    #// Set up progress bar 
    $i++ 
    $status = "{0:N0}" -f ($i / $tot * 100) 
    Write-Progress -Activity "Exporting AD Groups" -status "Processing Group $i of $tot : $status% Completed" -PercentComplete ($i / $tot * 100) 
 
    #// Ensure Members variable is empty 
    $Members = "" 
 
    #// Get group members which are also groups and add to string 
    $MembersArr = Get-ADGroup -filter {Name -eq $ADGroup.Name} | Get-ADGroupMember |  select Name 
    if ($MembersArr) { 
        foreach ($Member in $MembersArr) { 
            $Members = $Members + "," + $Member.Name 
        } 
        $Members = $Members.Substring(1,($Members.Length) -1) 
    } 
 
    #// Set up hash table and add values 
    $HashTab = $NULL 
    $HashTab = [ordered]@{ 
        "Name" = $ADGroup.Name 
        "Category" = $ADGroup.GroupCategory 
        "Scope" = $ADGroup.GroupScope 
        "Members" = $Members 
    } 
 
    #// Add hash table to CSV data array 
    $CSVOutput += New-Object PSObject -Property $HashTab 
} 
 
#// Export to CSV files 
$CSVOutput | Sort-Object Name | Export-Csv $CSVFile -NoTypeInformation 
 
#// End of script
```

# spo site list

Lists modern sites of the given type

## Usage

```sh
spo site list [options]
```

## Options

`--help`
: output usage information

`--type [type]`
: type of modern sites to list. Allowed values `TeamSite,CommunicationSite`, default `TeamSite`

`-f, --filter [filter]`
: filter to apply when retrieving sites

`--deleted`
: use this switch to only return deleted sites

`--query [query]`
: JMESPath query string. See [http://jmespath.org/](http://jmespath.org/) for more information and examples

`-o, --output [output]`
: Output type. `json,text`. Default `text`

`--verbose`
: Runs command with verbose logging

`--debug`
: Runs command with debug logging

`--help`
: output usage information

`--type [type]`
: type of modern sites to list. Allowed values `TeamSite,CommunicationSite`, default `TeamSite`

`-f, --filter [filter]`
: filter to apply when retrieving sites

`--deleted`
: use this switch to only return deleted sites

`--query [query]`
: JMESPath query string. See [http://jmespath.org/](http://jmespath.org/) for more information and examples

`-o, --output [output]`
: Output type. `json,text`. Default `text`

`--verbose`
: Runs command with verbose logging

`--debug`
: Runs command with debug logging

```
console.log('Hello World');
```

```javascript
console.log('Hello World');
```

```typescript
console.log('Hello World');
```

!!! important
    To use this command you have to have permissions to access the tenant admin site.

## Remarks

Using the `-f, --filter` option you can specify which sites you want to retrieve. For example, to get sites with _project_ in their URL, use `Url -like 'project'` as the filter.

When using the text output type (default), the command lists only the values of the `Title`, and `Url` properties of the site. When setting the output type to JSON, all available properties are included in the command output.

## Examples

List all modern team sites in the currently connected tenant

```command
spo site list
```

List all modern team sites in the currently connected tenant

```sh
spo site list --type TeamSite
```

List all modern communication sites in the currently connected tenant

```sh
spo site list --type CommunicationSite
```

List all modern team sites that contain _project_ in the URL

```sh
spo site list --type TeamSite --filter "Url -like 'project'"
```

List all deleted sites in the tenant you're logged in to

```sh
spo site list --deleted
```
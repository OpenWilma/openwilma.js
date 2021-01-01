# Table of contents
## Classes

<dl>
<dt><a href="#OpenWilma">OpenWilma</a></dt>
<dd><p>This is the Javascript version of the OpenWilma project.</p>
<p>Author: @Esinko and Contributors </p>
<p>Website: <a href="https://openwilma.tech">https://openwilma.tech</a></p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#OpenWilmaAccount">OpenWilmaAccount</a> : <code>Object</code></dt>
<dd><p>The account object, which includes the username, password etc.</p>
</dd>
<dt><a href="#ServerUrl">ServerUrl</a> : <code>String</code></dt>
<dd><p>The Wilma server url</p>
</dd>
<dt><a href="#OpenWilmaConfiguration">OpenWilmaConfiguration</a> : <code>Object</code></dt>
<dd><p>OpenWilma configuration object, which includes the OpenWilma client configuration.</p>
</dd>
<dt><a href="#OpenWilmaSession">OpenWilmaSession</a> : <code>Object</code></dt>
<dd><p>OpenWilma session object</p>
</dd>
</dl>


# Documentation
Defenitions for each item (*see Table of contents*).<br>

---
## OpenWilma
This is the Javascript version of the OpenWilma project.Author: @Esinko and Contributors Website: https://openwilma.tech

**Kind**: global class  

* [OpenWilma](#OpenWilma)
    * [new OpenWilma(options)](#new_OpenWilma_new)
    * [.connect()](#OpenWilma+connect) ⇒ [<code>Promise.&lt;OpenWilmaSession&gt;</code>](#OpenWilmaSession)

<a name="new_OpenWilma_new"></a>

### new OpenWilma(options)
Create a new instance of OpenWilma


| Param | Type | Description |
| --- | --- | --- |
| options | [<code>OpenWilmaConfiguration</code>](#OpenWilmaConfiguration) | The options |

<a name="OpenWilma+connect"></a>

### openWilma.connect() ⇒ [<code>Promise.&lt;OpenWilmaSession&gt;</code>](#OpenWilmaSession)
Connect to the specified Wilma server with the specified credentials

**Kind**: instance method of [<code>OpenWilma</code>](#OpenWilma)  
<a name="OpenWilmaAccount"></a>

---
## OpenWilmaAccount : <code>Object</code>
The account object, which includes the username, password etc.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The name of the user to login as |
| password | <code>String</code> | The password of the account to login as |

<a name="ServerUrl"></a>

---
## ServerUrl : <code>String</code>
The Wilma server url

**Kind**: global typedef  
<a name="OpenWilmaConfiguration"></a>

---
## OpenWilmaConfiguration : <code>Object</code>
OpenWilma configuration object, which includes the OpenWilma client configuration.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| account | [<code>OpenWilmaAccount</code>](#OpenWilmaAccount) | The account object |
| url | [<code>ServerUrl</code>](#ServerUrl) | The Wilma server url |

<a name="OpenWilmaSession"></a>

---
## OpenWilmaSession : <code>Object</code>
OpenWilma session object

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The Wilma session id |


---
# End
These docs where generated with the ```buildDocs.js``` and can be easily regenerated with ```npm run build``` if there have been any changes to the Source Code
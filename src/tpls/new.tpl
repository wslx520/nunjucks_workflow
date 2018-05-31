{%extends '_layout.tpl'%}

{%block head%}
<title>Index</title>
{%endblock%}
{%block body%}
<ul>
    <li><a href="{{url if url else '#'}}">go to google news</a></li>
    <li><a href="{{emptyurl if emptyurl else '#'}}">go to google news</a></li>
</ul>
{%endblock%}
{%extends '_layout.tpl'%}

{%block head%}
<title>{{globalTitle}}</title>
{%endblock%}
{%block body%}
{%
    set how = {
        a: 'a'
    }
    %}
<ul>
    <li><a href="{{url if url else '#'}}">go to google news</a></li>
    <li><a href="{{emptyurl if emptyurl else '#'}}">go to {{how.a}}</a></li>
</ul>
{%endblock%}
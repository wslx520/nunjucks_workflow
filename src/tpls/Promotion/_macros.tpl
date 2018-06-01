{% macro nav(active='home') %}
<nav>
  <a href="#" class="{%if active == 'home' %} active {% endif %}">Home</a>
  <a href="#" class="{%if active == 'about' %} active {% endif %}">About</a>
  <a href="#" class="{%if active == 'contact' %} active {% endif %}">Contact</a>
</nav>
{% endmacro %}
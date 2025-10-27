from django.shortcuts import render

# Create your views here.
def base_index(request):
    return render(request, 'indexteste.html')
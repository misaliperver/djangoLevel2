from django.shortcuts import render # kendinden geldi



def index(request):
    return render(request, 'newpages/index.html')

def searchcalled(request):
    return render(request, 'newpages/searchcalled.html')

from django.shortcuts import render


def register(request):
    form = CreateUserForm()
    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account {username} has been created')
            user = form.save()
            Customer.objects.create(user=user, name=username)
            return redirect('login')
    return render(request, 'shop/register.svelte', context={'form': form})


def login_page(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.info(request, 'Incorrect data')
        return render(request, 'shop/login.html')


@login_required(login_url='login')
def logout_user(request):
    logout(request)
    return redirect('login')

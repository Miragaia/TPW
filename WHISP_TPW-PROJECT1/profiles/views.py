from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.http.response import HttpResponseBadRequest
from django.shortcuts import redirect, render
from django.contrib import messages
from django.views.generic import DetailView,View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from followers.models import Follower
from .forms import UserUpdateForm,ProfileUpdateForm
from notifications.signals import notify
from django.db.models import Q

from feed.models import Post

class ProfileDetailView(DetailView):
    http_method_names = ['get']
    template_name = "profiles/detail.html"
    model = User
    context_object_name = "user"
    slug_field = "username"
    slug_url_kwarg = "username"
    
    def dispatch(self, request, *args, **kwargs):
        self.request = request
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        user = self.get_object()

        media_filter = self.request.GET.get('filter')

        user_posts = self.get_posts_profile(user, media_filter)

        context = super().get_context_data(**kwargs)
        context['total_posts'] = Post.objects.filter(author=user).count()
        context['total_follower'] = Follower.objects.filter(following=user).count()
        context['user_posts'] = user_posts
        if self.request.user.is_authenticated:
            context['you_follow'] = Follower.objects.filter(following=user, followed_by=self.request.user).exists()
        
        context['active_filter'] =  media_filter  if  media_filter  in ['media', 'all'] else 'all'
        
        return context

    def get_posts_profile(self, user, media_filter=all):
        posts = Post.objects.filter(author=user).order_by('-date')

        if media_filter == 'media':
            posts = posts.exclude(image='', video='').exclude(image__isnull=True, video__isnull=True)
        elif media_filter == 'all':
            posts = posts.order_by('-date')
        return posts
        
        

class FollowView(LoginRequiredMixin,View):
    http_method_names = ['post']

    def post(self,request,*args,**kwargs):
        data = request.POST.dict()

        if "action" not in data or "username" not in data:
            return HttpResponseBadRequest("MISSING DATA!!")

        try:
            other_user = User.objects.get(username=data['username'])

        except User.DoesNotExist:
            return HttpResponseBadRequest("MISSING User!!")

        if data['action'] == 'follow':
            follower,created = Follower.objects.get_or_create(
                followed_by = request.user,
                following= other_user,
            )

            profile_owner = other_user
            notify.send(request.user, recipient=profile_owner, verb=f"{request.user.username} started following you.")

        else:
            try:
                follower = Follower.objects.get(
                    followed_by = request.user,
                    following= other_user,
                )
            
            except Follower.DoesNotExist:
                follower = None
            
            if follower:
                follower.delete()
        return JsonResponse({
            'success':True,
            'wording':'Unfollow' if data['action']=='follow' else 'Follow'
        })

@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST,instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES ,instance=request.user.profile)

        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request,f'Your Profile is Updated !!')
            return redirect('profile')            

    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
    context = {
        'u_form':u_form,
        'p_form': p_form
    }
    return render(request,'profiles/edit_profile.html', context)
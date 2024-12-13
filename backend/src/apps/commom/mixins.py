from django.core.cache import cache
from django.conf import settings

class CacheModelMixin:
    """Mixin to add caching to ViewSets"""
    cache_key_prefix = None
    cache_timeout = 3600

    def get_cache_key(self, pk):
        return f"{self.cache_key_prefix}_{pk}"

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        cache_key = self.get_cache_key(pk)
        
        # Try to get data from cache
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
            
        # If not in cache, get from database
        response = super().retrieve(request, *args, **kwargs)
        
        # Store in cache
        cache.set(cache_key, response.data, self.cache_timeout)
        return response
url = http://www.youtube.com/playlist?list=

download:
	youtube-dl $(url)$(YOUTUBEDLLIST) \
	--add-metadata --output "videos/%(title)s.%(ext)s" \
	--download-archive archive.txt --embed-thumbnail \
	--format "mp4[height<=1080]/best"

clean:
	rm -rf videos/*
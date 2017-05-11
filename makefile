url=http://www.youtube.com/playlist?list=
list=''

download:
	youtube-dl $(url)$(list) \
	--add-metadata --output "public/videos/%(title)s.%(ext)s" \
	--download-archive archive.txt --embed-thumbnail \
	--format "mp4[height<=780]/best"

clean:
	rm -rf public/videos/*

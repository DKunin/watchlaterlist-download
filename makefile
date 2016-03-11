url = http://www.youtube.com/playlist?list=

download:
	youtube-dl $(url)PL9tBT0fSdbmJtcabz3LMve-Ek9fU7Z6Jc \
	--add-metadata --output "public/videos/%(title)s.%(ext)s" \
	--download-archive archive.txt --embed-thumbnail \
	--format "mp4[height<=1080]/best"

clean:
	rm -rf public/videos/*